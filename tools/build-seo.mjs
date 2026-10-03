import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copy, services, regions, locations, faqs, paths, homeMeta } from '../content/site-data.mjs';
import { serviceGuides, regionGuides } from '../content/seo-content.mjs';
import { serviceImage, serviceCardTitle } from '../content/service-media.mjs';
import { locationGuide, placeKinds } from '../content/location-pages.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://auto-betina.com';
const template = await readFile(resolve(root, 'content/home-template.html'), 'utf8');
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const t = (lang, key) => copy[lang][key] ?? copy.bg[key] ?? key;
const tx = (lang, bg, en) => lang === 'bg' ? bg : en;
const home = lang => paths.home[lang];
const quote = (lang, service, region) => {
  const params = new URLSearchParams();
  if (service) params.set('service', service);
  if (region) params.set('region', region);
  return home(lang) + (params.size ? '?' + params : '') + '#quote';
};
const businessId = origin + '/#business';
const coveragePlaces = [...regions, ...locations];
const navigationPlaces = [...regions, locations.find(p => p.id === 'razliv')].filter(Boolean);
const areaServed = regions.map(region => ({ '@type': region.id === 'hemus' ? 'Place' : 'City', name: region.bg }));
const sprite = template.match(/  <svg class="icon-sprite"[\s\S]*?<\/svg>/)[0];
const pages = [];

function translate(html, lang) {
  html = html.replace(/<([a-z][\w-]*)\b([^>]*\bdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/gi, (_, tag, attrs, key) => `<${tag}${attrs}>${t(lang, key)}</${tag}>`);
  html = html.replace(/<[a-z][\w-]*\b[^>]*\bdata-i18n-(placeholder|aria|alt)="([^"]+)"[^>]*>/gi, (tag, kind, key) => tag.replace(new RegExp('\\b' + (kind === 'aria' ? 'aria-label' : kind) + '="[^"]*"'), (kind === 'aria' ? 'aria-label' : kind) + '="' + esc(t(lang, key)) + '"'));
  html = html.replace(/<a\b[^>]*\bdata-path-key="([^"]+)"[^>]*>/gi, (tag, key) => tag.replace(/href="[^"]*"/, `href="${paths[key][lang]}"`));
  return html;
}
function header(lang, pagePaths) {
  let html = template.match(/  <div class="topbar">[\s\S]*?<\/header>/)[0];
  html = translate(html, lang).replace('<a href="#" class="brand"', `<a href="${home(lang)}" data-path-key="home" class="brand"`);
  const other = lang === 'bg' ? 'en' : 'bg';
  html = html.replace(/<a class="language"[^>]*>[\s\S]*?<\/a>/, `<a class="language" id="language" href="${pagePaths[other]}" lang="${other}" hreflang="${other}" aria-label="${lang === 'bg' ? 'Switch to English' : 'Превключи на български'}">${lang.toUpperCase()} <span>/ ${other.toUpperCase()}</span></a>`);
  html = html.replaceAll('href="#quote"', `href="${quote(lang)}"`);
  return html;
}
function directory(lang) {
  return `<nav class="footer-directory" data-i18n-aria="areasNavigation" aria-label="${tx(lang, 'Услуги и райони', 'Services and areas')}"><div><h2 data-i18n="navServices">${t(lang, 'navServices')}</h2>${services.map(s => `<a href="${s.paths[lang]}" data-service-link="${s.id}">${esc(s[lang].title)}</a>`).join('')}</div><div><h2 data-i18n="navCoverage">${t(lang, 'navCoverage')}</h2>${navigationPlaces.map(r => `<a href="${r.paths[lang]}" data-region-link="${r.id}"><span data-region-name>${esc(tx(lang, 'Пътна помощ ' + r.bg, 'Roadside assistance ' + r.en))}</span></a>`).join('')}<a href="${paths.coverage[lang]}" data-path-key="coverage" data-i18n="locationDirectory">${t(lang,'locationDirectory')}</a></div><div><h2 data-i18n="usefulPages">${tx(lang, 'Полезни страници', 'Useful pages')}</h2>${['about','faq','contact'].map(key => `<a href="${paths[key][lang]}" data-path-key="${key}" data-i18n="${{about:'aboutIndex',faq:'faqIndex',contact:'contactIndex'}[key]}">${t(lang, {about:'aboutIndex',faq:'faqIndex',contact:'contactIndex'}[key])}</a>`).join('')}<a href="${quote(lang)}">${t(lang, 'freeQuote')}</a></div></nav>`;
}
function footer(lang) {
  let html = translate(template.match(/  <footer class="footer">[\s\S]*?<\/footer>/)[0], lang);
  html = html.replace('<a href="#" class="brand', `<a href="${home(lang)}" data-path-key="home" class="brand`);
  html = html.replace('<div class="container">', '<div class="container">' + directory(lang));
  html = html.replace(/<button class="text-button" id="privacy-button"[^>]*>[\s\S]*?<\/button>/, `<a href="${paths.contact[lang]}#privacy">${t(lang, 'privacy')}</a>`);
  return html.replaceAll('href="#quote"', `href="${quote(lang)}"`);
}
function graph(lang, page) {
  const url = origin + page.paths[lang];
  const business = { '@type': 'AutomotiveBusiness', '@id': businessId, name: 'Бетина 97 ООД', alternateName: ['Auto Betina', 'Betina 97'], url: origin + '/', logo: { '@type': 'ImageObject', url: origin + '/assets/favicon.svg' }, telephone: '+359878558152', address: { '@type': 'PostalAddress', addressLocality: 'Ботевград', addressCountry: 'BG' }, areaServed, openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens:'00:00', closes:'23:59' }, contactPoint: [{ '@type':'ContactPoint',telephone:'+359878558152',contactType:'customer service',availableLanguage:'Bulgarian' },{ '@type':'ContactPoint',telephone:'+359887558150',contactType:'customer service',availableLanguage:'Bulgarian' }] };
  const website = { '@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Бетина 97',alternateName:'Auto Betina',inLanguage:['bg','en'],publisher:{'@id':businessId} };
  const webpage = { '@type':page.type || 'WebPage', '@id':url+'#webpage', url, name:page[lang].title, description:page[lang].description, inLanguage:lang, isPartOf:{'@id':origin+'/#website'},about:{'@id':businessId} };
  const data = [business,website,webpage];
  if (page.crumbs?.length) {
    const items = [{name:t(lang,'home'),url:home(lang)},...page.crumbs.map(crumb=>({name:crumb.name[lang],url:crumb.paths[lang]}))];
    const id = url + '#breadcrumbs';
    data.push({'@type':'BreadcrumbList','@id':id,itemListElement:items.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:origin+item.url}))});
    webpage.breadcrumb = {'@id':id};
  }
  if (page.service) {
    const s=services.find(s=>s.id===page.service);
    const id=url+'#service';
    data.push({'@type':'Service','@id':id,url,name:s[lang].title,description:s[lang].text,serviceType:s[lang].title,provider:{'@id':businessId},areaServed});
    webpage.mainEntity={'@id':id};
  }
  if (page.region) {
    const place = coveragePlaces.find(r => r.id === page.region);
    webpage.spatialCoverage = {'@type':place.type || (place.id === 'hemus' ? 'Place' : 'City'), name:place[lang], geo:{'@type':'GeoCoordinates',latitude:place.point[0],longitude:place.point[1]}};
  }
  return {'@context':'https://schema.org','@graph':data};
}
function head(lang, page, homepage=false) {
  const url=origin+page.paths[lang], meta=page[lang];
  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f5c518">
  <title>${esc(meta.title)}</title>
  <meta name="description" content="${esc(meta.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="bg" href="${origin+page.paths.bg}">
  <link rel="alternate" hreflang="en" href="${origin+page.paths.en}">
  <link rel="alternate" hreflang="x-default" href="${origin+page.paths.bg}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Бетина 97">
  <meta property="og:title" content="${esc(meta.title)}">
  <meta property="og:description" content="${esc(meta.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:locale" content="${lang==='bg'?'bg_BG':'en_GB'}">
  <meta property="og:locale:alternate" content="${lang==='bg'?'en_GB':'bg_BG'}">
  <meta property="og:image" content="${origin}/assets/roadside-hero.jpg">
  <meta property="og:image:alt" content="${esc(t(lang,'heroAlt'))}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(meta.title)}">
  <meta name="twitter:description" content="${esc(meta.description)}">
  <meta name="twitter:image" content="${origin}/assets/roadside-hero.jpg">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/page.css">
  ${homepage ? '<link rel="preload" as="image" href="/assets/roadside-hero.jpg" fetchpriority="high">\n  <link rel="stylesheet" href="/vendor/leaflet/leaflet.css">\n  <script defer src="/vendor/leaflet/leaflet.js"></script>\n  <script type="module" src="/app.js"></script>' : (page.region ? '<link rel="stylesheet" href="/vendor/leaflet/leaflet.css">\n  <script defer src="/vendor/leaflet/leaflet.js"></script>\n  ' : '') + '<script defer src="/page.js"></script>'}
  <script defer src="/mobile-actions.js"></script>
  <script type="application/ld+json" data-seo-graph>${JSON.stringify(graph(lang,page)).replaceAll('<','\\u003c')}</script>
</head>`;
}
function breadcrumbs(lang,page) {
  return `<nav class="breadcrumbs" aria-label="${tx(lang,'Навигационна пътека','Breadcrumbs')}"><a href="${home(lang)}">${t(lang,'home')}</a>${page.crumbs.map((c,i)=>`<span aria-hidden="true">/</span>${i===page.crumbs.length-1?`<span aria-current="page">${esc(c.name[lang])}</span>`:`<a href="${c.paths[lang]}">${esc(c.name[lang])}</a>`}`).join('')}</nav>`;
}
function serviceCards(lang,ids=services.map(s=>s.id)) {
  return `<div class="service-grid seo-service-grid">${ids.map(id=>{
    const s=services.find(item=>item.id===id), c=s[lang];
    return `<article class="service-card ${s.featured?'featured':''}"><div class="service-card-media">${serviceImage(s,lang)}<span class="service-card-top"><span class="service-icon">${icon(s.icon)}</span><span class="service-tag">${t(lang,s.tag)}</span></span></div><h3><a href="${s.paths[lang]}">${serviceCardTitle(s,lang)}</a></h3><p>${esc(c.short)}</p><a class="service-card-bottom" href="${s.paths[lang]}"><span>${t(lang,'cardDetails')}</span>${icon('up-right')}</a></article>`;
  }).join('')}</div>`;
}
const list = items => `<ul class="seo-list">${items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`;
function faqList(lang,items=faqs[lang]) { return `<div class="faq-list">${items.map(([q,a])=>`<details><summary><span>${esc(q)}</span>${icon('chevron')}</summary><p>${esc(a)}</p></details>`).join('')}</div>`; }
function cta(lang,service,region) {
  return `<section class="seo-cta"><div><h2>${tx(lang,'Да уточним помощта за вас.','Let’s discuss the help you need.')}</h2><p>${t(lang,'availableNote')}</p></div><div class="seo-cta-actions"><a class="button button-yellow" href="tel:+359878558152">${icon('phone')}0878 558 152</a><a class="button button-glass" href="${quote(lang,service,region)}">${t(lang,'freeQuote')}${icon('up-right')}</a></div></section>`;
}
function localLinks(lang, entries=navigationPlaces) {
  return `<div class="local-links">${entries.map(r=>`<a href="${r.paths[lang]}" data-region-link="${r.id}"><span data-region-name>${esc(tx(lang,'Пътна помощ '+r.bg,'Roadside assistance '+r.en))}</span>${icon('up-right')}</a>`).join('')}</div>`;
}
function aside(lang,service,region) {
  return `<aside class="seo-aside"><span class="seo-aside-icon">${icon('phone')}</span><h2>${tx(lang,'Помощ на един разговор.','Help is one call away.')}</h2><p>${t(lang,'urgent')}</p><a class="seo-phone" href="tel:+359878558152">0878 558 152</a><a class="seo-second-phone" href="tel:+359887558150">0887 558 150</a><a class="button button-yellow" href="${quote(lang,service,region)}">${t(lang,'freeQuote')}</a><small>${t(lang,'callCost')}</small><a href="${paths.contact[lang]}">${t(lang,'contactIndex')}${icon('up-right')}</a></aside>`;
}
function nearbyPlaces(place) {
  const distance = p => (place.point[0]-p.point[0])**2 + ((place.point[1]-p.point[1])*Math.cos(place.point[0]*Math.PI/180))**2;
  return coveragePlaces.filter(p=>p.id!==place.id).toSorted((a,b)=>distance(a)-distance(b)).slice(0,6);
}
function placeMap(lang,place) {
  const points = place.points || [place.point];
  return `<section class="place-map-section" aria-label="${esc(tx(lang,'Карта: ','Map: ')+place[lang])}">
    <div class="place-map" id="place-map" tabindex="0" role="region" aria-label="${esc(tx(lang,'Карта с ориентир за ','Map showing ')+place[lang])}" data-map-points="${esc(JSON.stringify(points))}" data-map-name="${esc(place[lang])}"></div>
    <div class="place-map-caption"><span>${tx(lang,'Географски ориентир за мястото','Geographic reference for the place')}</span><span>${points.length>1 ? tx(lang,`${points.length} точки с това име`,`${points.length} points with this name`) : tx(lang,'Точната локация на автомобила се уточнява отделно.','Confirm your vehicle’s exact location separately.')}</span></div>
    <ol class="place-point-list">${points.map((point,index)=>`<li><button type="button" data-map-point="${index}" aria-label="${esc(tx(lang,`Покажи точка ${index+1}`,`Show point ${index+1}`))}">${icon('pin')}${point[0].toFixed(5)}, ${point[1].toFixed(5)}</button><a href="https://www.openstreetmap.org/?mlat=${point[0]}&mlon=${point[1]}#map=14/${point[0]}/${point[1]}" target="_blank" rel="noopener">${tx(lang,'Отвори карта','Open map')}${icon('up-right')}</a></li>`).join('')}</ol>
    <p class="place-data-credit">${tx(lang,'Географски данни','Geographic data')}: © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>. ${tx(lang,'Ориентирът не е офис или позиция на екип.','The reference is not an office or team position.')}</p>
    <noscript><p>${tx(lang,'Отворете линка към картата за тази точка.','Use the map link to view this point.')}</p></noscript>
  </section>`;
}
function areaDirectory(lang) {
  const rank={city:0,town:0,village:1,neighbourhood:2,suburb:2,hamlet:3,locality:4,road:5,junction:5};
  const entries=coveragePlaces.map(p=>({...p,kind:p.kind || (p.id==='hemus'?'road':'town')})).toSorted((a,b)=>(rank[a.kind]-rank[b.kind]) || a[lang].localeCompare(b[lang],lang));
  const groups={settlement:tx(lang,'Градове и села','Towns & villages'),hamlet:tx(lang,'Махали','Hamlets'),neighbourhood:tx(lang,'Квартали и вилни зони','Neighbourhoods'),locality:tx(lang,'Местности','Localities'),road:tx(lang,'Пътища и възли','Roads & junctions')};
  return `<section class="area-directory" id="area-directory" data-page-size="24" data-count-template="${tx(lang,'{count} {places} · показани {start}–{end}','{count} {places} · showing {start}–{end}')}" data-place-singular="${tx(lang,'място','place')}" data-place-plural="${tx(lang,'места','places')}">
    <div class="area-search-panel"><div><h2>${tx(lang,'Къде е аварирал автомобилът?','Where has your car broken down?')}</h2><p>${tx(lang,'Търсете на кирилица или латиница. Изберете мястото за карта, телефон и оферта.','Search in Bulgarian or Latin spelling. Choose a place for its map, phone and quote options.')}</p></div>
    <div class="area-search-controls"><div><label for="area-search">${tx(lang,'Населено място, квартал или район','Place, neighbourhood or area')}</label><input type="search" id="area-search" placeholder="${tx(lang,'Например: Разлив, Трудовец, Зелин…','For example: Razliv, Trudovets, Zelin…')}" autocomplete="off" maxlength="150" disabled></div><div><label for="area-type">${tx(lang,'Вид място','Place type')}</label><select id="area-type" disabled><option value="">${tx(lang,'Всички места','All places')}</option>${Object.entries(groups).map(([key,label])=>`<option value="${key}">${label}</option>`).join('')}</select></div></div></div>
    <div class="area-results-toolbar"><p id="area-result-count" role="status" aria-live="polite">${entries.length} ${tx(lang,'места в показания район','places in the mapped area')}</p><button type="button" class="text-button" id="area-clear" hidden>${tx(lang,'Изчисти търсенето','Clear search')}</button></div>
    <div class="area-place-grid" id="area-place-grid">${entries.map(p=>{const kind=placeKinds[p.kind]; const parent=regions.find(r=>r.id===p.parentRegion); const search=[p.bg,p.en,p.id,...(p.aliases||[])].join(' ');return `<article class="area-place-card" data-search="${esc(search)}" data-group="${kind.group}"><span class="area-place-kind">${kind[lang]}</span><h3><a href="${p.paths[lang]}">${esc(p[lang])}</a></h3><p>${parent?esc(tx(lang,'Ориентир: '+parent.bg,'Reference area: '+parent.en)):tx(lang,'Основен район','Main area')}</p><a class="area-place-link" href="${p.paths[lang]}">${tx(lang,'Пътна помощ и карта','Roadside help & map')}${icon('up-right')}</a></article>`;}).join('')}</div>
    <div class="area-empty" id="area-empty" hidden><h3>${tx(lang,'Няма съвпадение за това място.','No matching place found.')}</h3><p>${tx(lang,'Опитайте друго изписване или се обадете с точната локация.','Try another spelling or call with your exact location.')}</p><a class="button button-yellow" href="tel:+359878558152">${icon('phone')}0878 558 152</a></div>
    <nav class="area-pagination" id="area-pagination" aria-label="${tx(lang,'Страници с места','Directory pages')}" hidden><button class="button button-dark" type="button" id="area-prev">${tx(lang,'Предишни','Previous')}</button><span id="area-page-label"></span><button class="button button-dark" type="button" id="area-next">${tx(lang,'Следващи','Next')}</button></nav>
    <p class="area-source-note">${tx(lang,'Местата са извлечени от приблизителната граница на основния район на картата. Наличността се уточнява по телефон.','Places are extracted from the approximate main area shown on the map. Availability is confirmed by phone.')} ${tx(lang,'Географски данни','Geographic data')}: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>.</p>
    <noscript><p>${tx(lang,'Показани са всички места. За филтриране активирайте JavaScript.','All places are shown. Enable JavaScript to filter them.')}</p></noscript>
  </section>`;
}
async function save(page,lang,html) {
  const location=resolve(root,'.'+page.paths[lang],'index.html');
  await mkdir(dirname(location),{recursive:true});
  await writeFile(location,html);
  pages.push({page,lang,path:page.paths[lang]});
}
const homePage={paths:paths.home,...homeMeta};
for(const lang of ['bg','en']) {
  let html=translate(template,lang).replace('<html lang="bg">',`<html lang="${lang}">`).replace(/<head>[\s\S]*?<\/head>/,head(lang,homePage,true));
  html=html.replace(/  <div class="topbar">[\s\S]*?<\/header>/,header(lang,paths.home));
  html=html.replace('<!-- SERVICES -->',serviceCards(lang).replace(/^<div[^>]*>/,'').replace(/<\/div>$/,''));
  html=html.replace('<!-- FAQS -->',faqList(lang).replace(/^<div[^>]*>/,'').replace(/<\/div>$/,''));
  html=html.replace('<!-- REGIONS -->',regions.map((r,i)=>`<button type="button" class="region-button ${i===0?'active':''}" data-region="${i}" aria-pressed="${i===0}">${icon('pin')}<span>${r[lang]}</span>${icon('up-right')}</button>`).join(''));
  html=html.replace('<!-- REGION LINKS -->',localLinks(lang)+`<a class="text-link index-link" href="${paths.coverage[lang]}" data-path-key="coverage"><span data-i18n="locationDirectory">${t(lang,'locationDirectory')}</span>${icon('up-right')}</a>`);
  if (lang === 'en') html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, '<noscript><div class="noscript-note">Enable JavaScript to use the map and request form. For 24/7 roadside assistance call <a href="tel:+359878558152">0878 558 152</a> or <a href="tel:+359887558150">0887 558 150</a>.</div></noscript>');
  html=html.replace(/  <footer class="footer">[\s\S]*?<\/footer>/,footer(lang).replace(`<a href="${paths.contact[lang]}#privacy">${t(lang,'privacy')}</a>`,`<button class="text-button" id="privacy-button" data-i18n="privacy">${t(lang,'privacy')}</button>`));
  // Native HTML also exposes quote options before the interaction script loads.
  html=html.replace('<div class="service-choices" id="service-choices"></div>',`<div class="service-choices" id="service-choices">${services.map(s=>`<label class="service-choice"><input type="radio" name="service" value="${s.id}" ${s.id==='tow'?'checked':''}>${icon(s.icon)}<span>${esc(s[lang].title)}</span></label>`).join('')}</div>`);
  html=html.replace('<select id="request-vehicle" name="vehicle"></select>',`<select id="request-vehicle" name="vehicle">${[['car','vehicleCar'],['suv','vehicleSuv'],['van','vehicleVan'],['other','vehicleOther']].map(([v,k])=>`<option value="${v}">${t(lang,k)}</option>`).join('')}</select>`);
  await save(homePage,lang,html);
}

const hubs={
  services:{bg:{title:'Услуги за пътна помощ и репатрак | Бетина 97',description:'Репатрак, помощ при спукана гума, акумулатор, доставка на гориво и извличане. Услуги в Ботевград и района. Уточнете наличност и цена на 0878 558 152.',heading:'Услуги за пътна помощ',intro:'От автомобил, който не пали, до уговорен превоз с репатрак. Изберете услугата, за да видите какви детайли са нужни и как се уточнява помощта.'},en:{title:'Roadside Assistance Services & Towing | Betina 97',description:'Towing, flat tire help, battery assistance, fuel delivery and vehicle recovery around Botevgrad. Confirm availability and price: +359 878 558 152.',heading:'Roadside assistance services',intro:'From a vehicle that will not start to arranged flatbed transport. Choose a service to see which details are needed and how assistance is agreed.'}},
  coverage:{bg:{title:'Пътна помощ по населено място и район | Бетина 97',description:'Намерете пътна помощ край Разлив, Трудовец, Скравена и други места около Ботевград, Правец, Мездра и Хемус. Търсене, карта и контакт с Бетина 97.',heading:'Пътна помощ близо до вас',intro:'Намерете населеното място, квартала или пътния възел в нашия основен район. Всяко място има своя карта, телефон за помощ и заявка с попълнен район.'},en:{title:'Find Roadside Assistance by Place or Area | Betina 97',description:'Find roadside assistance near Razliv, Trudovets, Skravena and places around Botevgrad, Pravets, Mezdra and Hemus. Search locations, maps and call Betina 97.',heading:'Find roadside assistance near you',intro:'Find your town, village, neighbourhood or road junction in our main area. Each place has its own map, help phone number and a quote with the area already filled in.'}},
  about:{bg:{title:'За Бетина 97 ООД | Пътна помощ Ботевград',description:'Бетина 97 ООД — компания за денонощна пътна помощ от Ботевград. Превоз на леки и лекотоварни автомобили в Правец, Мездра и района на АМ Хемус.',heading:'За Бетина 97',intro:copy.bg.aboutText},en:{title:'About Betina 97 | Botevgrad Roadside Assistance',description:'Betina 97 OOD is a 24/7 roadside assistance company based in Botevgrad. Passenger car and light van transport around Pravets, Mezdra and Hemus.',heading:'About Betina 97',intro:copy.en.aboutText}},
  faq:{bg:{title:'Въпроси за пътна помощ, цена и репатрак | Бетина 97',description:'Как се определя цената на пътната помощ? Как да изпратите локация и заявка за репатрак? Отговори от Бетина 97 и денонощни телефони за контакт.',heading:'Въпроси за пътната помощ',intro:'Практични отговори за работното време, офертата, автомобила и изпращането на местоположение. За конкретния случай уточняваме детайлите по телефон.'},en:{title:'Roadside Assistance & Towing FAQs | Betina 97',description:'How is towing priced? How can you send your location and prepare a request? Answers from Betina 97, with 24/7 contact phone numbers.',heading:'Roadside assistance questions',intro:'Practical answers about hours, quotes, vehicles and sharing a location. For your specific situation, we confirm the details by phone.'}},
  contact:{bg:{title:'Контакти: Пътна помощ 24/7 | Бетина 97 Ботевград',description:'Телефони на Бетина 97 за пътна помощ 24/7: 0878 558 152 и 0887 558 150. Ботевград, Правец, Мездра и АМ Хемус. Безплатна консултация и оферта.',heading:'Контакти за пътна помощ 24/7',intro:'Свържете се с Бетина 97 за наличност, цена и подходяща помощ. При спешна заявка се обадете директно. Консултацията и офертата са безплатни.'},en:{title:'Contact Betina 97 | 24/7 Roadside Assistance Botevgrad',description:'Call Betina 97 24/7: +359 878 558 152 or +359 887 558 150. Botevgrad, Pravets, Mezdra and Hemus motorway. Free consultation and quote.',heading:'24/7 roadside assistance contacts',intro:'Contact Betina 97 to discuss availability, price and suitable assistance. Call directly for urgent requests. Advice and quotes are free.'}}
};
function hubBody(key,lang) {
  if(key==='services')return serviceCards(lang)+`<section class="seo-copy-block"><h2>${tx(lang,'Как се уточнява цената?','How is the price agreed?')}</h2><p>${faqs[lang][1][1]}</p><p>${t(lang,'serviceAvailability')}</p><h2>${t(lang,'navCoverage')}</h2>${localLinks(lang)}</section>`+cta(lang);
  if(key==='coverage')return areaDirectory(lang)+`<section class="seo-copy-block"><h2>${tx(lang,'Точната локация помага за точна оферта.','An exact location helps us quote clearly.')}</h2><p>${t(lang,'locationExplanation')} ${t(lang,'mapNote')}</p><a class="button button-dark" href="${home(lang)}#coverage">${icon('locate')}${tx(lang,'Интерактивна карта и GPS','Interactive map & GPS')}</a></section>`+cta(lang);
  if(key==='about')return `<div class="seo-content-layout"><article class="seo-prose"><h2>${tx(lang,'Местен екип от Ботевград','A local team from Botevgrad')}</h2><p>${t(lang,'aboutText2')}</p><h2>${tx(lang,'Превоз с платформа и лебедка','Flatbed transport and winch assistance')}</h2><p>${services[0][lang].text}</p>${list(services[0][lang].points)}<h2>${tx(lang,'Компанията и районът','The company and its area')}</h2><p>${tx(lang,'Юридическо наименование: Бетина 97 ООД. Базираме дейността си в Ботевград и обслужваме посочените райони. Картата показва района, а не адрес на офис или позиция на екип.','Legal company name: Betina 97 OOD. Based in Botevgrad, serving the listed areas. The map represents coverage, not an office address or team position.')}</p>${localLinks(lang)}<a class="text-link" href="${paths.contact[lang]}">${t(lang,'contactIndex')}${icon('up-right')}</a></article>${aside(lang)}</div>`+cta(lang);
  if(key==='faq')return `<div class="seo-content-layout"><article>${faqList(lang)}<section class="seo-copy-block"><h2>${tx(lang,'Готови детайли за разговора','Have the details ready for your call')}</h2><p>${t(lang,'quoteIntro')}</p><a class="button button-dark" href="${quote(lang)}">${t(lang,'startRequest')}${icon('up-right')}</a></section></article>${aside(lang)}</div>`;
  return `<div class="seo-content-layout"><article class="seo-prose"><div class="seo-contact-cards"><a href="tel:+359878558152"><span>${t(lang,'mainPhone')}</span><strong>0878 558 152</strong>${icon('phone')}</a><a href="tel:+359887558150"><span>${t(lang,'secondPhone')}</span><strong>0887 558 150</strong>${icon('phone')}</a></div><p>${t(lang,'callCost')}</p><a class="button button-dark" href="/assets/betina-97.vcf" download="betina-97.vcf">${icon('phone')}${t(lang,'saveContact')}</a><h2>${tx(lang,'Работно време и район','Hours and coverage')}</h2><p>${t(lang,'always')} ${tx(lang,'Бетина 97 ООД · Ботевград, България.','Betina 97 OOD · Botevgrad, Bulgaria.')}</p>${localLinks(lang)}<h2>${tx(lang,'Безплатна оферта по телефон или SMS','A free quote by phone or SMS')}</h2><p>${t(lang,'sendNote')}</p><a class="button button-yellow" href="${quote(lang)}">${t(lang,'startRequest')}${icon('up-right')}</a><section id="privacy" class="seo-copy-block"><h2>${t(lang,'privacyTitle')}</h2><p>${t(lang,'privacyIntro')}</p>${list(t(lang,'privacyPoints'))}<a class="text-link" href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener">${t(lang,'privacyMapLink')}${icon('up-right')}</a></section></article>${aside(lang)}</div>`;
}
async function renderPage(page,body) {
  for(const lang of ['bg','en']) {
    const meta=page[lang];
    const html=`<!doctype html>\n<html lang="${lang}">\n${head(lang,page)}\n<body class="seo-page"><a class="skip-link" href="#main">${t(lang,'skip')}</a>\n${sprite}\n${header(lang,page.paths)}\n<main id="main"><div class="container">${breadcrumbs(lang,page)}<section class="seo-page-heading"><h1>${esc(meta.heading)}</h1><p class="seo-lead">${esc(meta.intro)}</p>${page.region ? `<div class="seo-heading-actions"><a class="button button-yellow" href="tel:+359878558152">${icon('phone')}${t(lang,'callNow')}</a><a class="button button-dark" href="${quote(lang,'tow',page.region)}">${t(lang,'freeQuote')}${icon('up-right')}</a></div>` : ''}</section>${body(lang)}</div></main>\n${footer(lang)}\n<div class="mobile-action-bar"><a href="tel:+359878558152" class="button button-yellow">${icon('phone')}${t(lang,'callNow')}</a><a class="button button-dark" href="${quote(lang,page.service,page.region)}">${t(lang,'freeQuote')}</a></div>\n</body>\n</html>\n`;
    await save(page,lang,html);
  }
}
for(const [key,meta] of Object.entries(hubs)) {
  const page={...meta,paths:paths[key],type:key==='about'?'AboutPage':key==='contact'?'ContactPage':key==='services'||key==='coverage'?'CollectionPage':'WebPage',crumbs:[{paths:paths[key],name:{bg:meta.bg.heading,en:meta.en.heading}}]};
  await renderPage(page,lang=>hubBody(key,lang));
}
for(const service of services) {
  const guide=serviceGuides[service.id];
  const page={paths:service.paths,service:service.id,crumbs:[{paths:paths.services,name:{bg:'Услуги',en:'Services'}},{paths:service.paths,name:{bg:service.bg.title,en:service.en.title}}]};
  for(const lang of ['bg','en'])page[lang]={...guide[lang],heading:service[lang].title,intro:service[lang].text};
  await renderPage(page,lang=>{
    const g=guide[lang];
    return `<div class="seo-content-layout"><article class="seo-prose"><h2>${tx(lang,'Кога е подходяща тази помощ?','When is this assistance suitable?')}</h2>${list(g.when)}<h2>${tx(lang,'Как можем да съдействаме','How we can help')}</h2>${list(service[lang].points)}<p>${esc(g.extra)}</p><h2>${tx(lang,'Какви детайли да подготвите','Which details to prepare')}</h2>${list(g.prepare)}<p class="seo-availability">${t(lang,'availableNote')}</p><h2>${tx(lang,'Въпроси за услугата','Service questions')}</h2>${faqList(lang,g.faq)}</article>${aside(lang,service.id)}</div>${cta(lang,service.id)}<section class="seo-related"><h2>${tx(lang,'Помощ в нашия район','Help in our area')}</h2>${localLinks(lang)}<h2>${tx(lang,'Други услуги','Other services')}</h2>${serviceCards(lang,services.filter(s=>s.id!==service.id).slice(0,3).map(s=>s.id))}</section>`;
  });
}
for(const region of coveragePlaces) {
  const guide=regionGuides[region.id] || locationGuide(region);
  const parent = regions.find(r => r.id === region.parentRegion);
  const page={paths:region.paths,region:region.id,crumbs:[{paths:paths.coverage,name:{bg:'Райони',en:'Coverage'}},...(parent ? [{paths:parent.paths,name:{bg:parent.bg,en:parent.en}}] : []),{paths:region.paths,name:{bg:region.bg,en:region.en}}]};
  for(const lang of ['bg','en'])page[lang]={...guide[lang],title:guide[lang].title || guide[lang].heading+' | '+(lang==='bg'?'Бетина 97':'Betina 97')};
  await renderPage(page,lang=>{
    const g=guide[lang], map= `https://www.openstreetmap.org/?mlat=${region.point[0]}&mlon=${region.point[1]}#map=12/${region.point[0]}/${region.point[1]}`;
    return `<div class="seo-content-layout"><article class="seo-prose"><h2>${esc(g.heading2)}</h2>${placeMap(lang,region)}<p>${esc(g.text)}</p><h2>${tx(lang,'Детайли за заявка от района','Details for a request from this area')}</h2>${list(g.prepare)}<div class="seo-map-links"><a class="button button-dark" href="${home(lang)}#coverage">${icon('locate')}${tx(lang,'Споделете локация на картата','Share a location on the map')}</a><a class="text-link" href="${map}" target="_blank" rel="noopener">${tx(lang,'Ориентир за района','View the area')}${icon('up-right')}</a></div><p class="field-note">${tx(lang,'Ориентирът е за района, а не за офис или местоположение на екип. За помощ извън него уточняваме място и маршрут по телефон.','The map shows the area, not an office or team location. For assistance beyond it, we discuss the location and route by phone.')}</p>${g.faq ? `<h2>${tx(lang,'Въпроси за помощ около '+region.bg,'Questions about help near '+region.en)}</h2>${faqList(lang,g.faq)}` : ''}</article>${aside(lang,'tow',region.id)}</div><section class="seo-related"><h2>${tx(lang,'Услуги за този район','Services for this area')}</h2>${serviceCards(lang,g.focus)}<p class="seo-availability">${t(lang,'serviceAvailability')}</p></section>${cta(lang,'tow',region.id)}<section class="seo-related"><h2>${tx(lang,'Други райони на обслужване','Other service areas')}</h2>${localLinks(lang,nearbyPlaces(region))}<a class="text-link index-link" href="${paths.coverage[lang]}">${t(lang,'locationDirectory')}${icon('up-right')}</a></section>`;
  });
}
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${pages.map(({page,lang,path})=>`  <url>\n    <loc>${origin+path}</loc>\n${['bg','en','x-default'].map(code=>`    <xhtml:link rel="alternate" hreflang="${code}" href="${origin+page.paths[code==='x-default'?'bg':code]}"/>`).join('\n')}\n  </url>`).join('\n')}\n</urlset>\n`;
await writeFile(resolve(root,'sitemap.xml'),sitemap);
await writeFile(resolve(root,'robots.txt'),`User-agent: *\nAllow: /\nDisallow: /tools/\nDisallow: /content/home-template.html\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Generated ${pages.length} static pages with reciprocal language links and sitemap entries.`);
