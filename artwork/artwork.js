(() => {
  const root = document.documentElement;
  const items = window.BUILDER_ART_LIBRARY;
  const groups = {
    'Mastheads & portraits': 'featured',
    'Coastal scenes': 'landscapes',
    'Talk markers': 'markers',
    'Details & ornaments': 'details'
  };
  const cards = items.map(item => {
    const wide = ['featured', 'landscapes'].includes(groups[item.category]);
    const figure = document.createElement('figure');
    figure.dataset.artId = item.id;
    const link = document.createElement('a');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = wide ? 'landscape-image' : 'detail-image';
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    let crop;
    if (item.bounds) {
      crop = document.createElement('span');
      crop.className = 'detail-crop';
      crop.append(img);
      link.append(crop);
    } else {
      link.append(img);
      if (!wide) link.classList.add('vector-image');
    }
    const caption = document.createElement('figcaption');
    const labels = document.createElement('div');
    const heading = document.createElement('h3');
    const dimensions = document.createElement('span');
    const download = document.createElement('a');
    heading.textContent = item.name;
    dimensions.className = 'art-dimensions';
    labels.append(heading, dimensions);
    download.className = 'art-download';
    download.textContent = 'Download ↗︎';
    caption.append(labels, download);
    figure.append(link, caption);
    document.getElementById(groups[item.category]).append(figure);
    return { item, img, crop, link, heading, dimensions, download };
  });

  function updateEditions() {
    const night = root.dataset.theme === 'night';
    cards.forEach(({ item, img, crop, link, heading, dimensions, download }) => {
      const edition = night && item.night ? item.night : item;
      const name = edition.name || item.name;
      const label = item.night ? (night ? 'Night edition' : 'Day edition') : 'Original study';
      const src = edition.preview || edition.original;
      const extension = edition.original.split('.').pop().toLowerCase();
      if (img.getAttribute('src') !== src) img.src = src;
      heading.textContent = name;
      img.alt = name + ', ' + label.toLowerCase();
      if (crop) {
        // Generated night editions have their own silhouettes and canvas sizes.
        const b = edition.bounds || item.bounds;
        const ratio = b.w * b.ratio / b.h;
        crop.style.width = Math.min(205, 218 * ratio) + 'px';
        crop.style.aspectRatio = String(ratio);
        img.style.width = 100 / b.w + '%';
        img.style.left = -100 * b.x / b.w + '%';
        img.style.top = -100 * b.y / b.h + '%';
      } else {
        img.width = edition.width;
        img.height = edition.height;
      }
      link.href = edition.original;
      link.setAttribute('aria-label', 'Open ' + name + ', ' + label.toLowerCase());
      download.href = edition.original;
      download.download = item.id + (item.night ? (night ? '-night' : '-day') : '') + '.' + extension;
      download.setAttribute('aria-label', 'Download ' + name + ', ' + label.toLowerCase());
      dimensions.textContent = extension === 'svg'
        ? label + ' · SVG vector'
        : label + ' · ' + edition.width + ' × ' + edition.height + ' · ' + extension.toUpperCase();
    });
  }

  updateEditions();
  // Follow the shared theme, including changes made in another open site tab.
  new MutationObserver(updateEditions).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  document.querySelector('[data-art-count]').textContent = items.length + ' artworks, including ' + items.filter(item => item.night).length + ' paired night editions.';
})();
