# Search structure and maintenance

The site has 564 static pages: 282 in Bulgarian and 282 equivalent English pages. Every page contains useful content, navigation, metadata, and its language links in the HTML served by the host.

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
| Razliv, Pravets municipality | `/rayoni/razliv/` | `/en/coverage/razliv/` |
| Mezdra | `/rayoni/mezdra/` | `/en/coverage/mezdra/` |
| Hemus motorway | `/rayoni/hemus/` | `/en/coverage/hemus/` |
| 265 other extracted named places | `/rayoni/{place}/` | `/en/coverage/{place}/` |
| Company information | `/za-nas/` | `/en/about/` |
| FAQs | `/vuprosi/` | `/en/faq/` |
| Contact | `/kontakti/` | `/en/contact/` |

The service guides explain suitable cases, preparation details, availability, and specific questions. Regional guides give different practical location guidance for the company's existing service areas. They do not claim additional offices or guaranteed arrival times.

## Searches from a breakdown location

The Razliv pages address the visitor's immediate need: a car has broken down in or near Razliv and the visitor needs a contact for help. The English title is “Roadside Assistance Near Razliv | Betina 97”; the Bulgarian title is “Пътна помощ Разлив и района | Бетина 97”. Both pages have direct call actions, local request guidance, relevant services, local FAQs, and a quote shortcut that prefills the place. All regional pages now offer call and quote actions directly beneath the introduction.

The directory contains 270 areas: the four original coverage areas and 266 distinct geographic names extracted from the homepage map boundary. These include 34 villages, 209 hamlet names, neighbourhoods, localities, road sections and junctions. The complete public OpenStreetMap snapshot contains 292 features; same-name features of the same type are consolidated. A shared page can show multiple map points when a name occurs in several places.

`content/coverage-area.mjs` is the single boundary source for the map and optional data import. `data/osm-places.json` preserves the query, source timestamp and public geographic features. `tools/prepare-places.mjs` filters representative points to the boundary, generates stable Latin URLs and records Bulgarian / English names, aliases, nearest reference area and source feature IDs in `content/places.mjs`. The nearest reference area is a navigation aid, not an administrative municipality claim. Data attribution and refresh instructions are in [data/README.md](data/README.md).

Each place uses `content/location-pages.mjs` unless a detailed custom guide exists in `content/seo-content.mjs`. The template supplies a place-specific title, description, H1, map, location preparation text, related services, nearby area links, direct calls and a quote shortcut. These are complete static HTML pages, so a crawler can read them without running JavaScript. The business schema retains the verified main service areas; geographic page points are separate from business office or fleet coordinates.

The coverage directory has all 270 place links in its HTML. JavaScript adds Bulgarian / Latin search, common search-phrase handling, place type filters, 24-result pagination and shareable `q` / `type` query parameters. Without JavaScript all places remain accessible. Filter URLs use the directory canonical; each actual place page has its own canonical and sitemap entry. Changing language retains the directory search.

Razliv belongs to Pravets municipality, according to [the municipality's official notice](https://pravets.bg/ads/view/saobshtenie-do-zasegnatite-imoti-po-regulatsionniya-plan-na-s-razliv-2140). The existing Razliv guide remains in place alongside the reusable location template. Places beyond the existing polygon, such as Troyan, are not added by this extraction. Expand the boundary only if the company changes its operating area.

The page title is generated from its stable locality record. Multiple search wordings can reach the same locality URL; the visitor's private Google query is not required.

## Search signals

- One descriptive H1 and unique title / description for every page.
- Normal HTML links from navigation, service cards, coverage sections, breadcrumbs, related content, and the footer directory.
- Self-referencing canonical URLs on `https://auto-betina.com`, including the language-specific pages. Quote query parameters are excluded from canonicals.
- Reciprocal `bg`, `en`, and `x-default` alternates in HTML and the XML sitemap. Bulgarian is the default. Loading an English URL returns English HTML regardless of any saved preference.
- JSON-LD business, website, page, service, and breadcrumb entities with consistent business identity and both public contact numbers.
- Open Graph and Twitter preview metadata. The illustrative image is labelled accordingly.
- A 564-URL sitemap and robots.txt that permit crawling all public pages and the assets required to render them.

The company schema includes the known base city and service areas. A public customer-facing street address has not been verified, so no street address, office coordinates, or review ratings have been invented. This markup is not a promise of eligibility for Google's local business rich results. No FAQ rich-result or site-search markup is included.

## Editing and checking

Edit `content/home-template.html`, `content/site-data.mjs`, `content/seo-content.mjs`, or the shared `content/location-pages.mjs` template. Refresh geographic data using the documented import workflow when needed. Secondary templates and metadata are in `tools/build-seo.mjs`. Then run:

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
