# Search structure and maintenance

The site has 32 static pages: 16 in Bulgarian and 16 equivalent English pages. Every page contains useful content, navigation, metadata, and its language links in the HTML served by the host.

## Page directory

| Content | Bulgarian | English |
| --- | --- | --- |
| Homepage | `/` | `/en/` |
| Services directory | `/uslugi/` | `/en/services/` |
| Towing | `/uslugi/patna-pomosht-i-repatrak/` | `/en/services/towing/` |
| Tire assistance | `/uslugi/remont-i-smyana-na-gumi/` | `/en/services/tire-assistance/` |
| Battery assistance | `/uslugi/podavane-na-tok/` | `/en/services/battery-assistance/` |
| Express assistance | `/uslugi/ekspresna-pomosht/` | `/en/services/express-assistance/` |
| Fuel delivery | `/uslugi/dostavka-na-gorivo/` | `/en/services/fuel-delivery/` |
| Recovery / transport | `/uslugi/izvlichane-i-transport/` | `/en/services/vehicle-recovery/` |
| Coverage directory | `/rayoni/` | `/en/coverage/` |
| Botevgrad | `/rayoni/botevgrad/` | `/en/coverage/botevgrad/` |
| Pravets | `/rayoni/pravets/` | `/en/coverage/pravets/` |
| Mezdra | `/rayoni/mezdra/` | `/en/coverage/mezdra/` |
| Hemus motorway | `/rayoni/hemus/` | `/en/coverage/hemus/` |
| Company information | `/za-nas/` | `/en/about/` |
| FAQs | `/vuprosi/` | `/en/faq/` |
| Contact | `/kontakti/` | `/en/contact/` |

The service guides explain suitable cases, preparation details, availability, and specific questions. Regional guides give different practical location guidance for the company's existing service areas. They do not claim additional offices or guaranteed arrival times.

## Search signals

- One descriptive H1 and unique title / description for every page.
- Normal HTML links from navigation, service cards, coverage sections, breadcrumbs, related content, and the footer directory.
- Self-referencing canonical URLs on `https://auto-betina.com`, including the language-specific pages. Quote query parameters are excluded from canonicals.
- Reciprocal `bg`, `en`, and `x-default` alternates in HTML and the XML sitemap. Bulgarian is the default. Loading an English URL returns English HTML regardless of any saved preference.
- JSON-LD business, website, page, service, and breadcrumb entities with consistent business identity and both public contact numbers.
- Open Graph and Twitter preview metadata. The illustrative image is labelled accordingly.
- A 32-URL sitemap and robots.txt that permit crawling all public pages and the assets required to render them.

The company schema includes the known base city and service areas. A public customer-facing street address has not been verified, so no street address, office coordinates, or review ratings have been invented. This markup is not a promise of eligibility for Google's local business rich results. No FAQ rich-result or site-search markup is included.

## Editing and checking

Edit `content/home-template.html`, `content/site-data.mjs`, and `content/seo-content.mjs`. Secondary templates and metadata are in `tools/build-seo.mjs`. Then run:

```sh
node tools/build-seo.mjs
python3 tools/check-seo.py
```

Commit and deploy the generated HTML directories, sitemap, and runtime files together. The generator uses only Node.js standard libraries; checks use Python's standard library. Generated files can be hosted directly without running the generator on the server.

The validator checks local structural consistency; it does not predict rankings or certify a Google rich result. Existing domain configuration and Google verification files are retained.

## After deployment

1. Check that production serves the directory URLs with HTTP 200 and that all links and assets use HTTPS.
2. Submit `https://auto-betina.com/sitemap.xml` in the existing verified Google Search Console property. Inspect the homepage, services directory, a service guide, and a regional guide with URL Inspection.
3. Review indexing and search performance over time. Google decides which pages to index, how to rewrite snippets, and whether to display sitelinks.
4. Keep company phones, service availability, and any Google Business Profile consistent with the actual business. Add a verified public address only if it is appropriate for customers to visit.

Search Console submission and production deployment have not been performed by this local code change.

## Official guidance

- [Google sitelinks](https://developers.google.com/search/docs/appearance/sitelinks): automatically selected from a site's structure; they cannot be guaranteed or manually assigned.
- [Multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites): distinct language URLs and explicit language annotations.
- [Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business): accurate business data and required properties for rich-result eligibility.
- [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse): avoid duplicate location pages created only to capture search queries.
