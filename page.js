/* Secondary pages have complete content and native links without JavaScript. */
(() => {
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('#mobile-nav');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    nav.hidden = open;
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.hidden = true;
    menu.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav && menu) {
      nav.hidden = true;
      menu.setAttribute('aria-expanded', 'false');
    }
  });
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const directory = document.querySelector('#area-directory');
  if (directory) {
    const input = document.querySelector('#area-search');
    const type = document.querySelector('#area-type');
    const count = document.querySelector('#area-result-count');
    const clear = document.querySelector('#area-clear');
    const pagination = document.querySelector('#area-pagination');
    const previous = document.querySelector('#area-prev');
    const next = document.querySelector('#area-next');
    const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
    const ignored = new Set(['roadside','assistance','help','near','towing','in','around','пътна','помощ','репатрак','край','около','в','с','село','град','patna','pomosht','repatrak'].map(normalize));
    const cards = [...directory.querySelectorAll('.area-place-card')].map(node=>({node,search:normalize(node.dataset.search),group:node.dataset.group}));
    const size = Number(directory.dataset.pageSize);
    let current = 1;
    const initial = new URLSearchParams(location.search);
    input.value = (initial.get('q') || '').slice(0,150);
    if ([...type.options].some(o=>o.value===initial.get('type'))) type.value = initial.get('type');
    input.disabled = type.disabled = false;
    function render(updateUrl = false) {
      const tokens = normalize(input.value).split(' ').filter(token=>token && !ignored.has(token));
      const found = cards.filter(card=>(!type.value || card.group===type.value) && tokens.every(token=>card.search.includes(token)));
      const pages = Math.max(1,Math.ceil(found.length/size));
      current = Math.min(current,pages);
      cards.forEach(card=>{card.node.hidden=true;});
      found.slice((current-1)*size,current*size).forEach(card=>{card.node.hidden=false;});
      const start = found.length ? (current-1)*size+1 : 0;
      count.textContent = directory.dataset.countTemplate.replace('{count}',found.length).replace('{places}',found.length===1 ? directory.dataset.placeSingular : directory.dataset.placePlural).replace('{start}',start).replace('{end}',Math.min(current*size,found.length));
      document.querySelector('#area-empty').hidden = found.length>0;
      pagination.hidden = found.length<=size;
      previous.disabled = current===1;
      next.disabled = current===pages;
      document.querySelector('#area-page-label').textContent = current + ' / ' + pages;
      clear.hidden = !input.value && !type.value;
      const params = new URLSearchParams(location.search);
      if (input.value.trim()) params.set('q',input.value.trim()); else params.delete('q');
      if (type.value) params.set('type',type.value); else params.delete('type');
      const query = params.toString() ? '?' + params : '';
      if (updateUrl) history.replaceState(null,'',location.pathname + query + location.hash);
      const language = document.querySelector('#language');
      if (language) language.href = new URL(language.href).pathname + query + location.hash;
    }
    input.addEventListener('input',()=>{current=1;render(true);});
    type.addEventListener('change',()=>{current=1;render(true);});
    clear.addEventListener('click',()=>{input.value='';type.value='';current=1;render(true);input.focus();});
    previous.addEventListener('click',()=>{current--;render();document.querySelector('#area-result-count').scrollIntoView({block:'start'});});
    next.addEventListener('click',()=>{current++;render();document.querySelector('#area-result-count').scrollIntoView({block:'start'});});
    render();
  }

  const mapElement = document.querySelector('#place-map');
  if (mapElement) {
    let map;
    const points = JSON.parse(mapElement.dataset.mapPoints);
    function initialize() {
      if (map) return;
      if (!window.L) {
        mapElement.textContent = document.documentElement.lang==='bg' ? 'Отворете линка към картата по-долу.' : 'Use the map link below.';
        return;
      }
      map = L.map(mapElement,{scrollWheelZoom:false}).setView(points[0],13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'}).addTo(map);
      const markerIcon = L.divIcon({className:'',html:'<div class="region-marker"></div>',iconSize:[20,20],iconAnchor:[10,10]});
      points.forEach(point=>{
        const label = document.createElement('strong');
        label.textContent = mapElement.dataset.mapName;
        L.marker(point,{icon:markerIcon,title:mapElement.dataset.mapName}).addTo(map).bindPopup(label);
      });
      if (points.length>1) map.fitBounds(points,{padding:[35,35],maxZoom:14,animate:false});
    }
    document.querySelectorAll('[data-map-point]').forEach(button=>button.addEventListener('click',()=>{initialize();if(map)map.setView(points[Number(button.dataset.mapPoint)],15,{animate:false});mapElement.focus();}));
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){initialize();observer.disconnect();}},{rootMargin:'250px'});
      observer.observe(mapElement);
    } else initialize();
  }
})();
