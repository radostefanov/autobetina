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
})();
