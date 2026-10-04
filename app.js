import { serviceCardTitle } from './content/service-media.mjs';
import { coverageBoundary } from './content/coverage-area.mjs';
import { copy, services, regions, locations, faqs, paths, homeMeta } from './content/site-data.mjs';

/* Static website: request details stay in memory; the visitor sends the SMS. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const phone = '+359878558152';
  const coveragePlaces = [...regions, ...locations];
  let lang = document.documentElement.lang === 'en' ? 'en' : 'bg';
  const state = { service: 'tow', step: 1, map: null, selectedPoint: null, requestPoint: null, requestLocationText: '', activeRegion: 0, markers: [], userMarker: null, message: '', toastTimer: null, locationRequest: 0, dialogKind: null };
  let locationPreviewMap = null;
  const t = key => copy[lang][key] ?? copy.bg[key] ?? key;

  const serviceData = id => {
    const service = services.find(item => item.id === id) || services[0];
    return { ...service, ...service[lang] };
  };

  function renderServices() {
    $('#service-grid').innerHTML = services.map(item => {
      const s = serviceData(item.id);
      return `<article class="service-card ${s.featured ? 'featured' : ''}"><div class="service-card-top"><span class="service-icon">${icon(s.icon)}</span><span class="service-tag">${t(s.tag)}</span></div><h3><a href="${s.paths[lang]}">${serviceCardTitle(s,lang)}</a></h3><p>${s.short}</p><div class="service-card-bottom"><a class="service-details" href="${s.paths[lang]}">${t('cardDetails')}</a><button type="button" class="service-request" data-select-service="${s.id}" aria-label="${t('requestService')}: ${s.title}">${t('cardRequest')}</button></div></article>`;
    }).join('');
    $('#service-choices').innerHTML = services.map(item => {
      const s = serviceData(item.id);
      return `<label class="service-choice"><input type="radio" name="service" value="${s.id}" ${state.service === s.id ? 'checked' : ''}>${icon(s.icon)}<span>${s.title}</span></label>`;
    }).join('');
  }
  function renderRegions() {
    $('#region-buttons').innerHTML = regions.map((region, index) => `<button type="button" class="region-button ${index === state.activeRegion ? 'active' : ''}" data-region="${index}" aria-pressed="${index === state.activeRegion}">${icon('pin')}<span>${region[lang]}</span><svg class="icon region-arrow" aria-hidden="true"><use href="#i-up-right"/></svg></button>`).join('');
    state.markers.forEach((marker, index) => marker.bindPopup(`<strong>${regions[index][lang]}</strong><br>${t('coverageLabel')}<br><a href="tel:${phone}">${lang === 'bg' ? 'Обадете се' : 'Call us'}: 0878 558 152</a>`));
  }
  function renderFaqs() {
    const opened = $$('details[open]', $('#faq-list')).map(node => Number(node.dataset.faq));
    $('#faq-list').innerHTML = faqs[lang].map(([question, answer], index) => `<details data-faq="${index}" ${opened.includes(index) ? 'open' : ''}><summary><span>${question}</span>${icon('chevron')}</summary><p>${answer}</p></details>`).join('');
  }
  function renderVehicles() {
    const selected = $('#request-vehicle').value || 'car';
    $('#request-vehicle').innerHTML = [['car', 'vehicleCar'], ['suv', 'vehicleSuv'], ['van', 'vehicleVan'], ['other', 'vehicleOther']].map(([value, key]) => `<option value="${value}">${t(key)}</option>`).join('');
    $('#request-vehicle').value = selected;
  }
  function setLanguage(next) {
    lang = next;
    document.documentElement.lang = lang;
    document.title = homeMeta[lang].title;
    document.querySelector('meta[name="description"]').content = homeMeta[lang].description;
    document.querySelector('link[rel="canonical"]').href = 'https://auto-betina.com' + paths.home[lang];
    [['og:title', homeMeta[lang].title], ['og:description', homeMeta[lang].description], ['og:url', 'https://auto-betina.com' + paths.home[lang]], ['og:locale', lang === 'bg' ? 'bg_BG' : 'en_GB']].forEach(([key, value]) => { const meta = document.querySelector('meta[property="' + key + '"]'); if (meta) meta.content = value; });
    [['twitter:title', homeMeta[lang].title], ['twitter:description', homeMeta[lang].description]].forEach(([key, value]) => { const meta = document.querySelector('meta[name="' + key + '"]'); if (meta) meta.content = value; });
    document.querySelectorAll('[data-path-key]').forEach(link => { link.href = paths[link.dataset.pathKey][lang]; });
    document.querySelectorAll('[data-region-link]').forEach(link => { const region = coveragePlaces.find(r => r.id === link.dataset.regionLink); if (region) { link.href = region.paths[lang]; const label = link.querySelector('[data-region-name]'); if (label) label.textContent = lang === 'bg' ? 'Пътна помощ ' + region.bg : 'Roadside assistance ' + region.en; } });
    document.querySelectorAll('[data-service-link]').forEach(link => { const service = services.find(s => s.id === link.dataset.serviceLink); if (service) { link.href = service.paths[lang]; link.textContent = service[lang].title; } });
    document.querySelectorAll('[data-home-anchor]').forEach(link => { link.href = paths.home[lang] + '#' + link.dataset.homeAnchor; });
    document.querySelectorAll('a[href="/#quote"], a[href="/en/#quote"]').forEach(link => { link.href = paths.home[lang] + '#quote'; });
    $('#language').href = paths.home[lang === 'bg' ? 'en' : 'bg'];
    $('#language').lang = lang === 'bg' ? 'en' : 'bg';
    $('#language').hreflang = lang === 'bg' ? 'en' : 'bg';
    const alternateLocale = document.querySelector('meta[property="og:locale:alternate"]');
    if (alternateLocale) alternateLocale.content = lang === 'bg' ? 'en_GB' : 'bg_BG';
    const graphElement = document.querySelector('script[data-seo-graph]');
    if (graphElement) {
      const data = JSON.parse(graphElement.textContent);
      const page = data['@graph'].find(item => item['@type'] === 'WebPage');
      if (page) Object.assign(page, { '@id': 'https://auto-betina.com' + paths.home[lang] + '#webpage', url: 'https://auto-betina.com' + paths.home[lang], name: homeMeta[lang].title, description: homeMeta[lang].description, inLanguage: lang });
      graphElement.textContent = JSON.stringify(data);
    }
    history.replaceState(null, '', paths.home[lang] + location.search + location.hash);
    $$('[data-i18n]').forEach(node => { node.innerHTML = t(node.dataset.i18n); });
    ['placeholder', 'aria', 'alt'].forEach(kind => {
      $$(`[data-i18n-${kind}]`).forEach(node => node.setAttribute(kind === 'aria' ? 'aria-label' : kind, t(node.getAttribute(`data-i18n-${kind}`))));
    });
    $('#language').innerHTML = lang === 'bg' ? 'BG <span>/ EN</span>' : 'EN <span>/ BG</span>';
    $('#language').setAttribute('aria-label', lang === 'bg' ? 'Switch to English' : 'Превключи на български');
    $('#request-phone').placeholder = lang === 'bg' ? '08XX XXX XXX' : '+359 XXX XXX XXX';
    $('#request-phone').setCustomValidity('');
    $('#form-error').hidden = true;
    renderServices(); renderRegions(); renderFaqs(); renderVehicles(); updateMapLabel();
    if (state.step === 3) buildSummary();
    if ($('#detail-dialog').open) $('#detail-dialog').close();
    try { localStorage.setItem('betina-language', lang); } catch (_) { /* Optional preference only. */ }
  }
  function notify(message) {
    const toast = $('#toast');
    clearTimeout(state.toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    state.toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
  }
  function openDialog(html, kind) {
    destroyLocationPreview();
    state.dialogKind = kind;
    $('#dialog-content').innerHTML = html;
    const heading = $('#dialog-content h2');
    if (heading) { heading.id = 'dialog-title'; $('#detail-dialog').setAttribute('aria-labelledby', 'dialog-title'); }
    const dialog = $('#detail-dialog');
    dialog.dataset.kind = kind;
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  function selectService(id) {
    state.service = services.some(item => item.id === id) ? id : 'tow';
    const radio = $(`input[name="service"][value="${state.service}"]`);
    if (radio) radio.checked = true;
    $('#destination-field').hidden = !['tow', 'recovery'].includes(state.service);
  }
  function goToQuote(id) {
    if (id) selectService(id);
    if ($('#detail-dialog').open) $('#detail-dialog').close();
    setStep(1, false);
    const target = matchMedia('(max-width:1000px)').matches ? $('.quote-panel') : $('#quote');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const chosen = $(`input[name="service"][value="${state.service}"]`);
    if (chosen) chosen.focus({ preventScroll: true });
  }
  function setStep(step, focus = true) {
    state.step = step;
    $$('[data-form-step]').forEach(fieldset => { fieldset.hidden = Number(fieldset.dataset.formStep) !== step; });
    $$('[data-progress]').forEach(item => {
      const number = Number(item.dataset.progress);
      item.classList.toggle('active', number === step);
      item.classList.toggle('complete', number < step);
      if (number === step) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
    });
    $('#form-error').hidden = true;
    if (step === 3) buildSummary();
    if (focus) {
      const target = $(`[data-form-step="${step}"] input:not([type=checkbox]), [data-form-step="${step}"] a, [data-form-step="${step}"] button`);
      target?.focus({ preventScroll: true });
      if (matchMedia('(max-width:760px)').matches) $('.quote-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  function validateDetails() {
    const location = $('#request-location');
    const contact = $('#request-phone');
    location.setCustomValidity(location.value.trim() ? '' : t('locationRequired'));
    const normalized = contact.value.trim().replace(/[\s().-]/g, '');
    contact.setCustomValidity(/^\+?\d{7,15}$/.test(normalized) ? '' : t('phoneRequired'));
    const invalid = [location, contact].find(input => !input.checkValidity());
    if (invalid) {
      $('#form-error').textContent = invalid.validationMessage;
      $('#form-error').hidden = false;
      invalid.focus(); invalid.reportValidity();
      return false;
    }
    return true;
  }
  function summaryRows() {
    const form = new FormData($('#quote-form'));
    const rows = [[t('serviceLabel'), serviceData(state.service).title], [t('locationLabel'), String(form.get('location')).trim()], [t('vehicleLabel'), $('#request-vehicle').selectedOptions[0].textContent], [t('phoneLabel'), String(form.get('phone')).trim()]];
    if (['tow', 'recovery'].includes(state.service) && String(form.get('destination')).trim()) rows.push([t('destinationLabel'), String(form.get('destination')).trim()]);
    if (String(form.get('notes')).trim()) rows.push([t('notesLabel'), String(form.get('notes')).trim()]);
    return rows;
  }
  function buildSummary() {
    const rows = summaryRows();
    const summary = $('#request-summary');
    summary.replaceChildren();
    rows.forEach(([label, value]) => {
      const row = document.createElement('div');
      const dt = document.createElement('dt'); dt.textContent = label;
      const dd = document.createElement('dd'); dd.textContent = value;
      row.append(dt, dd); summary.append(row);
    });
    state.message = `${t('messageHeading')}\n\n${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}`;
    if (state.requestPoint && $('#request-location').value === state.requestLocationText) state.message += `\n${mapUrl(state.requestPoint)}`;
    $('#sms-request').href = smsUrl(state.message);
  }
  function smsUrl(message) {
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    return `sms:${phone}${ios ? '&' : '?'}body=${encodeURIComponent(message)}`;
  }
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); }
      else {
        const field = document.createElement('textarea'); field.value = text;
        field.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;';
        document.body.append(field); field.select();
        const success = document.execCommand('copy'); field.remove();
        if (!success) throw new Error('Clipboard unavailable');
      }
      notify(t('copied'));
    } catch (_) {
      openDialog(`<h2>${t('copyTitle')}</h2><p>${t('copyFailed')}</p><textarea id="copy-fallback" class="dialog-input" rows="8" readonly></textarea>`, 'copy');
      $('#copy-fallback').value = text; $('#copy-fallback').focus(); $('#copy-fallback').select();
    }
  }
  const coordinates = point => `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`;
  const mapUrl = point => `https://www.google.com/maps?q=${point.lat.toFixed(5)},${point.lng.toFixed(5)}`;
  function updateMapLabel() {
    $('#map-selection').textContent = state.selectedPoint ? `${t('mapPoint')}: ${coordinates(state.selectedPoint)}` : t('mapHint');
    $('#use-map-location').hidden = !state.selectedPoint;
  }
  function pickPoint(point, fromGps = false) {
    state.selectedPoint = { lat: Number(point.lat), lng: Number(point.lng), fromGps };
    updateMapLabel();
    if (state.map) {
      if (state.userMarker) state.map.removeLayer(state.userMarker);
      state.userMarker = L.marker([point.lat, point.lng], { icon: L.divIcon({ className: '', html: '<div class="user-marker"></div>', iconSize: [19, 19], iconAnchor: [9, 9] }) }).addTo(state.map);
    }
  }
  function usePointInRequest(point) {
    state.requestPoint = { ...point };
    state.requestLocationText = `${point.fromGps ? t('locationPoint') : t('mapPoint')}: ${coordinates(point)}`;
    $('#request-location').value = state.requestLocationText;
    $('#request-location').setCustomValidity('');
    if (state.step === 3) buildSummary();
    notify(t('locationAdded'));
  }
  function initializeMap() {
    if (state.map) return;
    if (!window.L) { $('#map-fallback').hidden = false; return; }
    state.map = L.map('coverage-map', { scrollWheelZoom: false, zoomControl: true }).setView([43.001, 23.82], 10);
    const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors' });
    let loadedTiles = 0, failedTiles = 0;
    layer.on('tileload', () => { loadedTiles++; $('#map-fallback').hidden = true; });
    layer.on('tileerror', () => { failedTiles++; if (failedTiles > 3 && loadedTiles === 0) $('#map-fallback').hidden = false; });
    layer.addTo(state.map);
    L.polygon(coverageBoundary, { color: '#bd9508', weight: 1.5, dashArray: '5 6', fillColor: '#f5c518', fillOpacity: .1, interactive: false }).addTo(state.map);
    const markerIcon = L.divIcon({ className: '', html: '<div class="region-marker"></div>', iconSize: [20, 20], iconAnchor: [10, 10] });
    state.markers = regions.map(region => L.marker(region.point, { icon: markerIcon }).addTo(state.map));
    renderRegions();
    state.map.on('click', event => pickPoint(event.latlng));
    state.map.getContainer().addEventListener('keydown', event => {
      if (event.key === 'Enter' && event.target === state.map.getContainer()) {
        event.preventDefault();
        pickPoint(state.map.getCenter());
      }
    });
    if (state.selectedPoint) pickPoint(state.selectedPoint, state.selectedPoint.fromGps);
  }
  function showLocationError(message) {
    openDialog(`<span class="dialog-content-icon">${icon('locate')}</span><h2>${t('locationError')}</h2><p>${message}</p><input id="manual-location" class="dialog-input" maxlength="300" aria-label="${t('manualLocation')}" placeholder="${t('manualLocation')}"><button type="button" class="button button-yellow" id="add-manual-location">${t('addLocation')}${icon('up-right')}</button><button type="button" class="button button-dark" id="choose-map">${icon('pin')}${t('chooseOnMap')}</button><a class="button button-dark" href="tel:${phone}">${icon('phone')}0878 558 152</a>`, 'location-error');
  }
  function showLocationDialog(point, accuracy) {
    const text = `${t('locationMessage')}\n${coordinates(point)}\n${mapUrl(point)}`;
    openDialog(`<div class="dialog-location-heading"><span class="dialog-content-icon">${icon('locate')}</span><h2>${t('locationReady')}</h2></div><div class="location-preview-wrap"><div id="location-preview-map" role="region" aria-label="${t('locationMapLabel')}"></div><div class="location-preview-fallback" id="location-preview-fallback" hidden>${icon('pin')}<p>${t('locationMapUnavailable')}</p></div></div><p class="dialog-coordinates"><span>${t('locationCoordinates')}</span><span>${coordinates(point)}</span></p>${Number.isFinite(accuracy) ? `<p class="location-caption">${t('gpsAccuracy')}: ${Math.round(accuracy)} ${t('meters')}.</p>` : ''}<div class="dialog-location-actions"><a class="text-button" href="${mapUrl(point)}" target="_blank" rel="noopener">${icon('pin')}${t('viewOnMap')}</a><button type="button" class="text-button" id="copy-location">${icon('copy')}${t('copyLocation')}</button></div><div class="dialog-location-buttons"><a class="button button-yellow" href="${smsUrl(text)}">${icon('message')}${t('sendLocation')}</a><button type="button" class="button button-dark" id="location-for-quote">${t('useForQuote')}${icon('up-right')}</button></div><p class="field-note location-sms-note">${t('locationSmsNote')}</p>`, 'location');
    initializeLocationPreview(point, accuracy);
  }
  function destroyLocationPreview() {
    locationPreviewMap?.remove();
    locationPreviewMap = null;
  }
  function initializeLocationPreview(point, accuracy) {
    const fallback = $('#location-preview-fallback');
    if (!window.L) { fallback.hidden = false; return; }
    const preview = locationPreviewMap = L.map('location-preview-map', {scrollWheelZoom:false}).setView([point.lat, point.lng], 15);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:18, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'});
    let loaded = 0, failed = 0;
    tiles.on('tileload', () => { loaded++; fallback.hidden = true; });
    tiles.on('tileerror', () => { if (++failed >= 3 && loaded === 0) fallback.hidden = false; });
    tiles.addTo(preview);
    if (Number.isFinite(accuracy) && accuracy > 0) {
      const circle = L.circle([point.lat, point.lng], {radius:accuracy, color:'#ad8300', weight:1, fillColor:'#f5c518', fillOpacity:.15, interactive:false}).addTo(preview);
      if (accuracy > 500) preview.fitBounds(circle.getBounds(), {padding:[20,20], maxZoom:15, animate:false});
    }
    L.marker([point.lat, point.lng], {title:t('locationTitle'), icon:L.divIcon({className:'', html:'<div class="user-marker"></div>', iconSize:[19,19], iconAnchor:[9,9]})}).addTo(preview);
    requestAnimationFrame(() => { if (locationPreviewMap === preview && $('#detail-dialog').open) preview.invalidateSize(); });
  }
  function locate(action, button) {
    const request = ++state.locationRequest;
    if (!navigator.geolocation || !window.isSecureContext) { showLocationError(t('locationOther')); return; }
    const previousText = button?.innerHTML;
    if (button) button.disabled = true;
    if (action === 'help') openDialog(`<span class="dialog-content-icon">${icon('locate')}</span><h2>${t('finding')}</h2><p>${t('findingText')}</p><a class="button button-dark" href="tel:${phone}">${icon('phone')}0878 558 152</a>`, 'locating');
    navigator.geolocation.getCurrentPosition(position => {
      if (button) { button.disabled = false; button.innerHTML = previousText; }
      if (request !== state.locationRequest) return;
      const point = { lat: position.coords.latitude, lng: position.coords.longitude, fromGps: true };
      pickPoint(point, true);
      if (action === 'help') {
        if (state.dialogKind === 'locating' && $('#detail-dialog').open) showLocationDialog(point, position.coords.accuracy);
      } else {
        usePointInRequest(point);
        if (action === 'map') {
          initializeMap(); state.map?.setView([point.lat, point.lng], 13);
        }
      }
    }, error => {
      if (button) { button.disabled = false; button.innerHTML = previousText; }
      if (request !== state.locationRequest) return;
      if (action === 'help' && (state.dialogKind !== 'locating' || !$('#detail-dialog').open)) return;
      showLocationError(error.code === 1 ? t('locationDenied') : error.code === 3 ? t('locationTimeout') : t('locationOther'));
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  }
  function showPrivacy() {
    openDialog(`<span class="dialog-content-icon">${icon('shield')}</span><h2>${t('privacyTitle')}</h2><p>${t('privacyIntro')}</p><ul>${t('privacyPoints').map(point => `<li>${point}</li>`).join('')}</ul><p>${t('privacyContact')}</p><a class="text-link" href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener">${t('privacyMapLink')}${icon('up-right')}</a>`, 'privacy');
  }
  function saveContact() {
    notify(t('savedContact'));
  }

  $('#language').addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setLanguage(lang === 'bg' ? 'en' : 'bg');
  });
  $('.menu-button').addEventListener('click', () => {
    const expanded = $('.menu-button').getAttribute('aria-expanded') === 'true';
    $('.menu-button').setAttribute('aria-expanded', String(!expanded)); $('#mobile-nav').hidden = expanded;
  });
  $$('#mobile-nav a').forEach(link => link.addEventListener('click', () => { $('#mobile-nav').hidden = true; $('.menu-button').setAttribute('aria-expanded', 'false'); }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { $('#mobile-nav').hidden = true; $('.menu-button').setAttribute('aria-expanded', 'false'); } });
  $('#service-grid').addEventListener('click', event => {
    const request = event.target.closest('[data-select-service]');
    if (request) goToQuote(request.dataset.selectService);
  });
  $('#service-choices').addEventListener('change', event => { if (event.target.name === 'service') selectService(event.target.value); });
  $('#quote-form').addEventListener('submit', event => { event.preventDefault(); if (state.step === 1) setStep(2); else if (state.step === 2 && validateDetails()) setStep(3); });
  $('#quote-form').addEventListener('input', event => {
    if (event.target.setCustomValidity) event.target.setCustomValidity('');
    $('#form-error').hidden = true;
    if (event.target.id === 'request-location') { state.requestPoint = null; state.requestLocationText = ''; }
  });
  $$('[data-next]').forEach(button => button.addEventListener('click', () => {
    const next = Number(button.dataset.next);
    if (next === 2 || validateDetails()) setStep(next);
  }));
  $$('[data-back]').forEach(button => button.addEventListener('click', () => setStep(Number(button.dataset.back))));
  $('#copy-request').addEventListener('click', () => copyText(state.message));
  $('#region-buttons').addEventListener('click', event => {
    const button = event.target.closest('[data-region]'); if (!button) return;
    const index = Number(button.dataset.region); state.activeRegion = index; initializeMap(); renderRegions();
    state.map?.setView(regions[index].point, regions[index].zoom);
    state.markers[index]?.openPopup();
  });
  $('#use-map-location').addEventListener('click', () => { if (state.selectedPoint) { usePointInRequest(state.selectedPoint); goToQuote(); setStep(2); } });
  $$('[data-location-action]').forEach(button => button.addEventListener('click', () => locate(button.dataset.locationAction, button)));
  $('#detail-dialog .dialog-close').addEventListener('click', () => $('#detail-dialog').close());
  $('#detail-dialog').addEventListener('close', () => { destroyLocationPreview(); document.body.classList.remove('dialog-open'); state.dialogKind = null; });
  $('#detail-dialog').addEventListener('click', event => {
    const dialog = $('#detail-dialog');
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
    const select = event.target.closest('[data-select-service]');
    if (select) goToQuote(select.dataset.selectService);
    if (event.target.closest('#copy-location') && state.selectedPoint) copyText(`${coordinates(state.selectedPoint)}\n${mapUrl(state.selectedPoint)}`);
    if (event.target.closest('#location-for-quote') && state.selectedPoint) { usePointInRequest(state.selectedPoint); goToQuote(); setStep(2); }
    if (event.target.closest('#choose-map')) { dialog.close(); $('#coverage').scrollIntoView({ behavior: 'smooth' }); initializeMap(); }
    if (event.target.closest('#add-manual-location')) {
      const input = $('#manual-location'); const value = input.value.trim();
      if (!value) { input.focus(); input.setCustomValidity(t('locationRequired')); input.reportValidity(); return; }
      $('#request-location').value = value; $('#request-location').setCustomValidity(''); state.requestPoint = null; state.requestLocationText = '';
      goToQuote(); setStep(2); notify(t('locationAdded'));
    }
  });
  $('#detail-dialog').addEventListener('input', event => { if (event.target.setCustomValidity) event.target.setCustomValidity(''); });
  $('#privacy-button').addEventListener('click', showPrivacy);
  $('#save-contact').addEventListener('click', saveContact);
  $('#year').textContent = new Date().getFullYear();
  setLanguage(lang);
  const requestParams = new URLSearchParams(location.search);
  selectService(requestParams.get('service') || 'tow');
  const requestedRegion = coveragePlaces.find(region => region.id === requestParams.get('region'));
  if (requestedRegion) $('#request-location').value = requestedRegion[lang];
  setStep(1, false);
  if (location.hash === '#quote' && requestParams.has('service')) {
    requestAnimationFrame(() => goToQuote(state.service));
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { initializeMap(); observer.disconnect(); } }, { rootMargin: '100px' });
    observer.observe($('#coverage-map'));
  } else initializeMap();
})();
