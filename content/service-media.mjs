// Shared image markup keeps the static pages and homepage cards consistent.
const attribute = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

export function serviceImage(service, lang) {
  const image = service.image;
  return `<img class="service-image" src="${image.src}" srcset="${image.small} 480w, ${image.src} 960w" sizes="(max-width: 360px) calc(100vw - 40px), (max-width: 760px) calc((100vw - 52px) / 2), (max-width: 1200px) calc((100vw - 100px) / 3), 400px" width="960" height="${image.height}" alt="${attribute(image.alt[lang])}" loading="lazy" decoding="async">`;
}
