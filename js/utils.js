/* ============================================================
   DB STUDIO ARTIST ECOSYSTEM PLATFORM — UTILITY FUNCTIONS
   Kamo G · Version 1
   ============================================================ */

/**
 * SVG icon definitions — shared utility for all emoji replacements.
 * All icons use currentColor, stroke-width="2", stroke-linecap="round",
 * stroke-linejoin="round", fill="none", viewBox="0 0 24 24".
 * Usage: iconSVG('music', 16) returns an SVG string sized 16×16.
 */
function iconSVG(name, size) {
  size = size || 16;
  var vw = 'width="' + size + '" height="' + size + '"';
  var attr = ' stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"';

  var paths = {
    'menu':         '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    'dashboard':    '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
    'music':        '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    'calendar':     '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>',
    'camera':       '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    'radio':        '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
    'info':         '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    'play':         '<polygon points="5 3 19 12 5 21 5 3"/>',
    'headphones':   '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
    'clipboard':    '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
    'mail':         '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    'link':         '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    'users':        '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'activity':     '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    'download':     '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    'star':         '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    'twitter':      '<path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M17.232 4.768l-4.696 4.696"/><line x1="4" y1="4" x2="9.5" y2="9.5"/><line x1="14.5" y1="14.5" x2="20" y2="20"/>',
    'instagram':    '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>'
  };

  var d = paths[name] || '';
  return '<svg ' + vw + ' viewBox="0 0 24 24"' + attr + '>' + d + '</svg>';
}

/**
 * Format a number with commas (e.g., 12450 → "12,450")
 */
function formatNumber(num) {
  if (num === undefined || num === null) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format a number with abbreviation (e.g., 12450 → "12.5K")
 */
function formatNumberAbbreviated(num) {
  if (num === undefined || num === null) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

/**
 * Format a date string to a human-readable format
 * e.g., "2026-03-15" → "Mar 15, 2026"
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  var date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format a date as relative time (e.g., "2 days ago")
 */
function timeAgo(dateStr) {
  if (!dateStr) return '';
  var now = new Date();
  var date = new Date(dateStr + 'T00:00:00');
  var diffMs = now - date;
  var diffDays = Math.floor(diffMs / 86400000);

  if (diffDays < 0) return 'upcoming';
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return diffDays + ' days ago';
  if (diffDays < 30) return Math.floor(diffDays / 7) + ' weeks ago';
  if (diffDays < 365) return Math.floor(diffDays / 30) + ' months ago';
  return Math.floor(diffDays / 365) + ' years ago';
}

/**
 * Get the current page path from window location
 */
function getCurrentPage() {
  var path = window.location.pathname;
  if (path === '/' || path === '/index.html') return 'dashboard';
  return path.replace(/\.html$/, '').replace(/^\//, '') || 'dashboard';
}

/**
 * Fetch JSON data from a file path
 */
async function fetchData(path) {
  try {
    var response = await fetch(path);
    if (!response.ok) throw new Error('Failed to load: ' + path);
    return await response.json();
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
  var timeout;
  return function executedFunction() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
  var currentPage = getCurrentPage();
  var navLinks = document.querySelectorAll('.navbar__link, .sidebar__nav-item');

  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href) return;

    link.classList.remove('navbar__link--active', 'sidebar__nav-item--active');

    var linkPage = href.replace(/\.html$/, '').replace(/^\//, '') || 'dashboard';
    if (linkPage === currentPage) {
      link.classList.add(
        link.classList.contains('navbar__link') ? 'navbar__link--active' : 'sidebar__nav-item--active'
      );
    }
  });
}

/**
 * Toggle mobile navigation
 */
function initMobileNav() {
  var toggle = document.querySelector('.navbar__toggle');
  var links = document.querySelector('.navbar__links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', function() {
    links.classList.toggle('navbar__links--open');
    toggle.setAttribute('aria-expanded', links.classList.contains('navbar__links--open'));
  });

  links.querySelectorAll('.navbar__link').forEach(function(link) {
    link.addEventListener('click', function() {
      links.classList.remove('navbar__links--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Export for use in other scripts
window.DBStudio = window.DBStudio || {};
window.DBStudio.utils = {
  formatNumber: formatNumber,
  formatNumberAbbreviated: formatNumberAbbreviated,
  formatDate: formatDate,
  timeAgo: timeAgo,
  getCurrentPage: getCurrentPage,
  fetchData: fetchData,
  debounce: debounce,
  setActiveNavLink: setActiveNavLink,
  initMobileNav: initMobileNav,
  iconSVG: iconSVG
};
