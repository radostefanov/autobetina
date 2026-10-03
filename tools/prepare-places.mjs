import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { insideCoverage } from '../content/coverage-area.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const raw = JSON.parse(await readFile(resolve(root, 'data/osm-places.json'), 'utf8'));
const chars = {а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sht',ъ:'a',ь:'y',ю:'yu',я:'ya'};
const latin = value => [...value].map(c => {
  const mapped = chars[c.toLowerCase()];
  return mapped ? c === c.toUpperCase() ? mapped[0].toUpperCase() + mapped.slice(1) : mapped : c;
}).join('').replace(/iya\b/g, 'ia');
const normal = value => value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const slug = value => latin(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const anchors = [{id:'botevgrad',point:[42.907,23.793]},{id:'pravets',point:[42.896,23.917]},{id:'mezdra',point:[43.145,23.713]}];
const distance = (a,b) => (a[0]-b[0])**2 + ((a[1]-b[1])*Math.cos(a[0]*Math.PI/180))**2;
const groups = new Map();
let excluded = 0;
for (const el of raw.elements) {
  const tags = el.tags || {}, name = tags['name:bg'] || tags.name;
  const center = el.center || el, point = [center.lat, center.lon];
  if (!name || !point.every(Number.isFinite) || !insideCoverage(point)) { excluded++; continue; }
  const kind = tags.place || (tags.highway === 'motorway_junction' ? 'junction' : 'road');
  if (['town','city'].includes(kind) && ['ботевград','правец','мездра'].includes(normal(name))) continue;
  if (kind === 'road' && /хемус/i.test(name)) continue; // Existing Hemus page covers this road.
  const bg = kind === 'junction' ? 'Пътен възел ' + name : name;
  const enName = tags['name:en'] && !/[а-я]/i.test(tags['name:en']) ? tags['name:en'] : latin(name);
  const en = kind === 'junction' ? enName + ' motorway junction' : enName;
  const key = normal(bg) + '|' + kind;
  let place = groups.get(key);
  if (!place) {
    const id = slug(bg);
    place = {id,bg,en,kind,type:'Place',point,points:[],parentRegion:anchors.toSorted((a,b)=>distance(point,a.point)-distance(point,b.point))[0].id,aliases:[],osm:[],paths:{bg:`/rayoni/${id}/`,en:`/en/coverage/${id}/`}};
    groups.set(key, place);
  }
  if (!place.points.some(p => distance(p,point) < .00000025)) place.points.push(point);
  place.osm.push(`${el.type}/${el.id}`);
  const aliases = [name,bg,en,enName,tags.alt_name,tags['alt_name:bg'],tags['alt_name:en'],tags.short_name,tags['name:latin']].filter(Boolean).flatMap(v=>v.split(';').map(a=>a.trim()));
  place.aliases = [...new Set([...place.aliases,...aliases])];
}
const used = new Set();
const places = [...groups.values()].sort((a,b)=>a.bg.localeCompare(b.bg,'bg'));
for (const place of places) {
  if (used.has(place.id)) { place.id += '-' + place.kind; place.paths = {bg:`/rayoni/${place.id}/`,en:`/en/coverage/${place.id}/`}; }
  if (used.has(place.id)) throw new Error('Unresolved duplicate slug: ' + place.id);
  used.add(place.id);
}
const metadata = {fetchedAt:raw.fetchedAt,osmTimestamp:raw.osm3s?.timestamp_osm_base,endpoint:raw.endpoint,source:'OpenStreetMap contributors',license:'ODbL 1.0',licenseUrl:'https://www.openstreetmap.org/copyright',rawFeatures:raw.elements.length,excludedOutsideBoundary:excluded,locations:places.length};
await writeFile(resolve(root,'content/places.mjs'),`// Generated from data/osm-places.json by tools/prepare-places.mjs.\n// Contains public geographic names and representative map points, not company offices.\nexport const placeDataset = ${JSON.stringify(metadata,null,2)};\nexport const mapLocations = ${JSON.stringify(places,null,2)};\n`);
console.log(`Prepared ${places.length} unique locations; ${excluded} feature centers outside the boundary excluded.`);
console.log(JSON.stringify(places.reduce((counts,p)=>({...counts,[p.kind]:(counts[p.kind]||0)+1}),{})));
