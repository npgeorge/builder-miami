/* Shared light/night preference across Builder Miami pages. */
(() => {
  const key = 'builder-roundtable-theme-v1';
  const root = document.documentElement;
  const buttons = document.querySelectorAll('.theme-switch button[data-theme]');
  function apply(theme, save = false) {
    const selected = theme === 'night' ? 'night' : 'day';
    root.dataset.theme = selected;
    document.querySelector('meta[name="theme-color"]').content = selected === 'night' ? '#0b0d18' : '#f7f3ed';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === selected)));
    document.querySelectorAll('img[data-theme-art]').forEach(img => {
      const src = img.dataset[selected];
      if (src && img.getAttribute('src') !== src) img.src = src;
      const alt = img.dataset[selected + 'Alt'];
      if (alt) img.alt = alt;
    });
    if (save) { try { localStorage.setItem(key, selected); } catch {} }
  }
  buttons.forEach(button => button.addEventListener('click', () => apply(button.dataset.theme, true)));
  window.addEventListener('storage', event => { if (event.key === key) apply(event.newValue); });
  apply(root.dataset.theme);
  function updateEventStatus() {
    const now = Date.now();
    document.querySelectorAll('[data-start][data-end]').forEach(badge => {
      const start = Date.parse(badge.dataset.start), end = Date.parse(badge.dataset.end);
      if (!Number.isFinite(start) || !Number.isFinite(end)) return;
      const state = now >= end ? 'past' : now >= start ? 'live' : 'upcoming';
      badge.dataset.status = state;
      badge.textContent = state === 'past' ? 'Past roundtable' : state === 'live' ? 'Happening now' : 'Upcoming roundtable';
    });
  }
  updateEventStatus();
  if (document.querySelector('[data-start][data-end]')) setInterval(updateEventStatus, 60000);
})();
