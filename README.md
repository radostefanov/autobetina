# Auto Betina — Бетина 97

A responsive Bulgarian / English website for the roadside assistance company, compatible with the existing static hosting at [auto-betina.com](https://auto-betina.com/). The generated pages are ready to serve: no package installation, API key, or backend is required. Node.js is only needed to regenerate pages after editing the content sources.

## Preview

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open [the local website](http://127.0.0.1:4173/). GPS and clipboard features need HTTPS in production; localhost also works as a secure context.

## Features

- Six service descriptions with detail dialogs and service selection: towing, tire assistance, battery assistance, express visits, fuel delivery, and vehicle recovery / transport.
- A searchable directory of 270 areas: four main coverage areas and 266 named villages, hamlets, neighbourhoods, localities, road sections and junctions extracted from the existing map boundary. Search accepts Bulgarian / Latin names and phrases such as “roadside assistance near Razliv”. Place type filters, pagination and shareable search URLs are included.
- Each area has Bulgarian and English landing pages with a specific title, interactive map point, call actions, nearby places and a quote link that prefills the location. Repeated place names share one page showing all matching map points.
- Dedicated, linked pages for services, coverage areas, company information, FAQs, and contacts: 282 Bulgarian pages and 282 English equivalents. Page content and navigation are available without JavaScript.
- Interactive Leaflet / OpenStreetMap coverage map, town controls, point selection, and GPS location. Arrow keys pan a focused map; Enter selects its center. Town markers represent service areas, not fleet positions or an office address.
- Three-step free quote preparation, input validation, vehicle type, destination, notes, and priority request. The visitor reviews and sends a prepared SMS, or copies the details and calls. Nothing is sent automatically.
- Mobile call / location bar, FAQs, downloadable vCard, Bulgarian / English switching, privacy information, structured business metadata, sitemap, and custom favicon.
- Self-hosted fonts, map library, and hero image; the live map tiles are the only third-party runtime dependency.
- Unique page titles and descriptions, canonical URLs, reciprocal language annotations, breadcrumbs, business / service structured data, and a bilingual XML sitemap. See [SEO.md](SEO.md) for the page structure and indexing notes.

## Content and operational limits

Both phone numbers and the core coverage area come from the existing company website. The public business listing also describes platform / winch recovery and 24/7 assistance. Additional service options requested for this redesign are presented subject to telephone confirmation. There are no invented prices, testimonials, fleet counts, years of experience, or guaranteed arrival times.

The form prepares a message; it is **not a booking, callback submission, or dispatch system**. SMS / telephone charges follow the visitor's mobile plan. Availability, final price, and dispatch must be confirmed by the company. Actual GPS accuracy depends on the visitor's device and permission. There is an address / map fallback when GPS is unavailable. The English interface does not imply that an English-speaking operator is available.

The generated hero is illustrative, not a photograph of the company's actual fleet. Its alt text identifies it as illustrative. The image generation prompt and provenance are in [assets/README.md](assets/README.md).

Request details exist only in current-page memory; reloading clears them. Local storage holds only the language preference. There are no analytics or advertising cookies. Map images load when the map approaches the viewport and are subject to [OpenStreetMap's tile usage policy](https://operations.osmfoundation.org/policies/tiles/).

## Sources checked on 3 October 2026

- [Current official website](https://auto-betina.com/): 0878 558 152, 0887 558 150, 24/7 transport around Ботевград, Правец, Мездра and АМ Хемус.
- [Business Register company listing](https://www.business-register.bg/transportni-uslugi/item/4923-putna-pomosht-botevgrad): Бетина 97 ООД, recovery with a platform / winch, passenger and light commercial vehicles.
- [Company registry directory](https://www.ukazatelite.com/200022319): legal company name БЕТИНА 97 ООД. The registered residential address is deliberately not presented as a customer-facing office.
- [OpenStreetMap contributors](https://www.openstreetmap.org/copyright): public geographic names and map points, extracted through the [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API). Snapshot, query, boundary and ODbL attribution are documented in [data/README.md](data/README.md).
- [Leaflet official documentation](https://leafletjs.com/examples/quick-start/): map implementation. Leaflet 1.9.4 is included with its license in `vendor/leaflet/`.

## Deployment and editing

Serve this directory as static files, retaining `CNAME` and the existing Google verification file. The repository's current hosting can serve the redesign directly. No deployment or domain change has been performed by this task.

Edit `content/home-template.html` for the homepage layout, `content/site-data.mjs` for shared translations / services / regions, `content/seo-content.mjs` for the detailed service / regional guides, and `content/location-pages.mjs` for the shared locality template. `content/places.mjs` contains the generated geographic records; `content/coverage-area.mjs` defines the boundary used by both import and the homepage map. `tools/build-seo.mjs` contains the secondary page templates and metadata. `style.css` and `page.css` control the design; `app.js` and `page.js` control interactions. Regenerate all HTML files and the sitemap after changing source content:

```sh
node tools/build-seo.mjs
python3 tools/check-seo.py
```

Serve and deploy the generated directories along with root files and assets. Do not edit generated `index.html` files directly; regeneration replaces them. Phone numbers also appear in builder metadata / call links, the `phone` constant in `app.js`, and `assets/betina-97.vcf`; update all of those if contact details change.

Before publishing, the business should confirm the availability of tire, battery, fuel, and priority services. To add automatic dispatch, callback requests, or a live fleet location, connect an actual operational backend rather than simulating confirmation.

## Verification

Checked in the browser at desktop and mobile sizes: service dialog selection, required fields / invalid phone validation, safely displayed input, map point to SMS transfer, language switching while preserving form state, and absence of horizontal scrolling. SMS links were inspected without sending a message. Actual telephone calls, SMS delivery, and real-device GPS permission / accuracy were not exercised.

The SEO validator checks all 564 generated pages for unique metadata, canonical URLs, reciprocal language links, one H1, schema consistency, duplicate IDs, local assets, internal links / fragments, orphan pages, and static homepage service / FAQ content. Use `python3 tools/check-seo.py --http-origin http://127.0.0.1:4173` while the local preview runs to also verify HTTP responses. Browser checks cover service and region navigation, English equivalents, preselected quote shortcuts, retained form state when changing language, and responsive secondary pages.

The area directory was checked with Cyrillic and Latin search, full search phrases, type filters, pagination, preserved search on language switching, empty results, map markers, prefilled quote links, and desktop / mobile layouts. All extracted representative map points were checked against the coverage boundary.
