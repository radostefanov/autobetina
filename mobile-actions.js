/* Keep fixed mobile actions out of the way of typing and short viewports. */
(() => {
  const bar = document.querySelector('.mobile-action-bar');
  if (!bar) return;

  const mobile = window.matchMedia('(max-width: 760px)');
  const viewport = window.visualViewport;
  const nonTypingInputs = new Set(['button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit']);

  function isEditing(element) {
    if (!element || element.disabled || element.readOnly) return false;
    return element.isContentEditable || element.tagName === 'TEXTAREA' ||
      (element.tagName === 'INPUT' && !nonTypingInputs.has(element.type));
  }

  function update() {
    const visibleHeight = viewport?.height ?? window.innerHeight;
    // Keyboard resizing may leave the layout viewport unchanged (e.g. on iOS).
    const keyboardInset = viewport && Math.abs(viewport.scale - 1) < .01 &&
      document.documentElement.clientHeight - visibleHeight > 150;
    bar.hidden = mobile.matches && (isEditing(document.activeElement) || visibleHeight <= 480 || keyboardInset);
  }

  document.addEventListener('focusin', update);
  // Wait until focus has moved to the next element before restoring the bar.
  document.addEventListener('focusout', () => queueMicrotask(update));
  window.addEventListener('resize', update);
  window.addEventListener('pageshow', update);
  viewport?.addEventListener('resize', update);
  update();
})();
