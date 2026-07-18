/* Kamo. G website shared utilities */

function iconSVG(name, size) {
  size = size || 16;
  var paths = {
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    radio: '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    play: '<polygon points="5 3 19 12 5 21 5 3"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
  };
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.info) + '</svg>';
}

async function fetchData(path) {
  try {
    var response = await fetch(path);
    if (!response.ok) throw new Error('Failed to load ' + path + ' (' + response.status + ')');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getCurrentPage() {
  var path = window.location.pathname.replace(/\/$/, '');
  var leaf = path.split('/').pop() || 'index.html';
  leaf = leaf.replace(/\.html$/, '');
  return leaf === 'index' ? 'home' : leaf;
}

function setActiveNavLink() {
  var currentPage = getCurrentPage();
  document.querySelectorAll('.navbar__link, .sidebar__nav-item').forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var linkPage = href === '/' ? 'home' : href.split('/').pop().replace(/\.html$/, '');
    link.classList.remove('navbar__link--active', 'sidebar__nav-item--active');
    if (linkPage === currentPage) {
      link.classList.add(link.classList.contains('navbar__link') ? 'navbar__link--active' : 'sidebar__nav-item--active');
    }
  });
}

function initMobileNav() {
  var toggle = document.querySelector('.navbar__toggle');
  var links = document.querySelector('.navbar__links');
  if (!toggle || !links || toggle.dataset.ready === 'true') return;
  toggle.dataset.ready = 'true';
  toggle.addEventListener('click', function() {
    var open = links.classList.toggle('navbar__links--open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      links.classList.remove('navbar__links--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '';
  var minutes = Math.floor(seconds / 60);
  var remainder = Math.round(seconds % 60).toString().padStart(2, '0');
  return minutes + ':' + remainder;
}

window.KamoUtils = {
  iconSVG: iconSVG,
  fetchData: fetchData,
  getCurrentPage: getCurrentPage,
  setActiveNavLink: setActiveNavLink,
  initMobileNav: initMobileNav,
  formatFileSize: formatFileSize,
  formatDuration: formatDuration
};
