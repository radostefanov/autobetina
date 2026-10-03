# Coverage place data

Public geographic names and representative map points are derived from © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), available under the [Open Database License (ODbL) 1.0](https://opendatacommons.org/licenses/odbl/1-0/). Retain this attribution with the snapshot and derived database. Website templates and business copy are separate from the geographic database.

The snapshot `osm-places.json` was fetched on 3 October 2026 through the public [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API). It contains the original query, endpoint, coverage polygon, source timestamp and 292 returned map features. Only public place / road names, tags and geographic positions are present; no customer or company fleet locations are collected.

The polygon comes from the existing homepage's approximate main coverage area and is centralized in `content/coverage-area.mjs`. The query selects named towns, villages, hamlets, neighbourhoods, suburbs and localities, plus named motorway junctions and tunnel road ways. Representative centers must lie within the polygon. A tunnel way whose name is a road is described as a road section.

`tools/prepare-places.mjs` produces 266 distinct named records in `content/places.mjs`. It merges same-name records of the same place type, retains source IDs / aliases and multiple map points, and avoids duplicating the three core towns or the existing Hemus motorway page. Those four core areas remain separate records, giving a directory of 270 areas.

Normal builds read the saved data and do not contact Overpass. To refresh deliberately, run:

```sh
node tools/import-places.mjs
node tools/prepare-places.mjs
node tools/build-seo.mjs
python3 tools/check-seo.py
```

The import requires network access; the other steps work offline. Review changes to geographic names, slugs, types, points and the sitemap before deployment. Preserve redirects if a previously published URL changes. Map data can omit or mislabel places; correct verified geographic errors in OpenStreetMap or maintain a documented override rather than inventing geography.

Points indicate places, not an office, an active team or the caller's exact breakdown location. The nearest core town is a geographic reference for navigation, not an administrative municipality. Availability and access are confirmed by telephone.
