"""Validate published static pages without relying on JavaScript rendering."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from urllib.request import urlopen
import argparse
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
ORIGIN = 'https://auto-betina.com'
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'x': 'http://www.w3.org/1999/xhtml'}

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.ids, self.refs, self.canonicals, self.alternates = [], [], [], {}
        self.meta, self.graphs, self.title, self.h1 = {}, [], '', []
        self.lang = None
        self.in_title = self.in_h1 = self.in_json = False
        self.json = ''
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang = a.get('lang')
        if a.get('id'): self.ids.append(a['id'])
        self.refs.extend(a[key] for key in ('href', 'src') if key in a)
        if tag == 'link' and a.get('rel') == 'canonical': self.canonicals.append(a.get('href'))
        if tag == 'link' and a.get('rel') == 'alternate' and a.get('hreflang'): self.alternates[a['hreflang']] = a.get('href')
        if tag == 'meta': self.meta[a.get('name', a.get('property'))] = a.get('content')
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.in_h1 = True; self.h1.append('')
        if tag == 'script' and a.get('type') == 'application/ld+json': self.in_json = True; self.json = ''
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'h1': self.in_h1 = False
        if tag == 'script' and self.in_json:
            self.graphs.append(json.loads(self.json)); self.in_json = False
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_h1: self.h1[-1] += data
        if self.in_json: self.json += data

def local_file(path):
    decoded = unquote(path)
    candidate = ROOT / decoded.lstrip('/')
    return candidate / 'index.html' if decoded.endswith('/') or not decoded else candidate

def check(http_origin=None):
    entries = ET.parse(ROOT / 'sitemap.xml').findall('s:url', NS)
    records, htmls = {}, {}
    for entry in entries:
        url = entry.find('s:loc', NS).text
        assert url.startswith(ORIGIN + '/'), url
        path = urlsplit(url).path
        file = local_file(path)
        assert file.is_file(), f'Missing sitemap target: {path}'
        html = file.read_text()
        page = Page(html)
        assert path not in records, f'Duplicate sitemap URL: {path}'
        records[path] = page; htmls[path] = html
        assert page.lang in ('bg', 'en'), path
        assert page.canonicals == [url], f'Canonical mismatch: {path}'
        assert len(page.h1) == 1 and page.h1[0].strip(), f'Heading issue: {path}'
        assert page.title.strip() and page.meta.get('description', '').strip(), f'Missing metadata: {path}'
        assert 'noindex' not in page.meta.get('robots', ''), path
        assert page.meta.get('og:url') == url and page.meta.get('og:title') == page.title, path
        assert len(page.ids) == len(set(page.ids)), f'Duplicate IDs: {path}'
        assert set(page.alternates) == {'bg', 'en', 'x-default'}, f'Missing language alternates: {path}'
        assert page.alternates[page.lang] == url, path
        assert page.alternates['x-default'] == page.alternates['bg'], path
        sitemap_alternates = {a.get('hreflang'): a.get('href') for a in entry.findall('x:link', NS)}
        assert sitemap_alternates == page.alternates, f'Sitemap language mismatch: {path}'
        graph = page.graphs[0]['@graph']
        assert len({node['@id'] for node in graph}) == len(graph), f'Duplicate schema entities: {path}'
        webpages = [node for node in graph if node['@type'] in ('WebPage', 'AboutPage', 'ContactPage', 'CollectionPage')]
        assert len(webpages) == 1 and webpages[0]['url'] == url and webpages[0]['inLanguage'] == page.lang, path
        if http_origin:
            with urlopen(http_origin.rstrip('/') + path, timeout=10) as response:
                assert response.status == 200 and response.read().decode('utf-8') == html, f'HTTP content mismatch: {path}'
    assert len({p.title for p in records.values()}) == len(records), 'Duplicate page titles'
    assert len({p.meta['description'] for p in records.values()}) == len(records), 'Duplicate descriptions'
    linked = set()
    for path, page in records.items():
        for lang in ('bg', 'en'):
            other = records[urlsplit(page.alternates[lang]).path]
            assert other.lang == lang and other.alternates == page.alternates, f'Non-reciprocal language annotation: {path}'
        for ref in page.refs:
            parsed = urlsplit(ref)
            if parsed.scheme in ('tel', 'sms', 'data') or parsed.netloc and parsed.netloc != 'auto-betina.com': continue
            target_path = parsed.path or path
            target = local_file(target_path)
            assert target.exists(), f'Broken asset or link: {path} -> {ref}'
            if target_path in records: linked.add(target_path)
            if parsed.fragment and target.suffix == '.html':
                destination = records.get(target_path) or Page(target.read_text())
                assert unquote(parsed.fragment) in destination.ids, f'Broken fragment: {path} -> {ref}'
    assert set(records) <= linked, f'Orphan pages: {set(records) - linked}'
    for path in ('/', '/en/'):
        html = htmls[path]
        assert html.count('class="service-card ') >= 6, f'Services require JS: {path}'
        assert html.count('<details') >= 7, f'FAQs require JS: {path}'
        assert 'href="' + ('/uslugi/' if path == '/' else '/en/services/') in html, path
    print(f'PASS: {len(records)} pages; unique metadata, canonical URLs, reciprocal hreflang, schema, assets, internal links and static content.' + (' HTTP 200 verified.' if http_origin else ''))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(); parser.add_argument('--http-origin'); args = parser.parse_args()
    check(args.http_origin)
