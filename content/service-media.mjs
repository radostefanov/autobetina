// Shared service headings and localized service-page image markup.
const attribute = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

export function serviceHeaderImage(service, lang) {
  const image = service.image;
  return `<img class="service-header-image" src="${image.src}" srcset="${image.small} 480w, ${image.src} 960w" sizes="(max-width: 360px) calc(100vw - 32px), (max-width: 760px) calc(100vw - 40px), calc(100vw - 96px)" width="960" height="${image.height}" alt="${attribute(image.alt[lang])}" loading="eager" fetchpriority="high" decoding="async">`;
}

export function serviceCardTitle(service, lang) {
  const text = service[lang];
  return `<span class="service-title-full">${attribute(text.title)}</span><span class="service-title-short">${attribute(text.cardTitle)}</span>`;
}
