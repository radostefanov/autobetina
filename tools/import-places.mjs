// Optional one-off data refresh. Normal page generation uses the saved snapshot.
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { coverageBoundary } from '../content/coverage-area.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const endpoint = process.env.BETINA_OVERPASS_ENDPOINT || 'https://overpass-api.de/api/interpreter';
const polygon = coverageBoundary.flat().join(' ');
const query = `[out:json][timeout:80];(nwr[place~"^(city|town|village|hamlet|suburb|neighbourhood|locality)$"][name](poly:"${polygon}");node[highway=motorway_junction][name](poly:"${polygon}");way[highway][tunnel=yes][name](poly:"${polygon}"););out center tags;`;
const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'AutoBetinaCoverageImport/1.0 (one-off public map data extraction; https://auto-betina.com)' },
  body: new URLSearchParams({data: query}),
  signal: AbortSignal.timeout(100000)
});
if (!response.ok) throw new Error(`Overpass returned HTTP ${response.status}`);
const data = await response.json();
if (data.remark || !Array.isArray(data.elements)) throw new Error(data.remark || 'Missing map elements');
const snapshot = { fetchedAt: new Date().toISOString(), endpoint, query, boundary: coverageBoundary, ...data };
await mkdir(resolve(root, 'data'), {recursive:true});
await writeFile(resolve(root, 'data/osm-places.json'), JSON.stringify(snapshot, null, 2) + '\n');
console.log(`Saved ${data.elements.length} named map features.`);
console.log(data.elements.map(e => `${e.tags.name} (${e.tags.place || e.tags.highway || 'tunnel'})`).join('\n'));
