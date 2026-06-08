/* ============================================================
   DB STUDIO ARTIST ECOSYSTEM PLATFORM — UTILITY FUNCTIONS
   Kamo G · Version 1
   ============================================================ */

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
  const date = new Date(dateStr + 'T00:00:00');
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
  const now = new Date();
  const date = new Date(dateStr + 'T00:00:00');
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / 86400000);

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
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html') return 'dashboard';
  return path.replace(/\.html$/, '').replace(/^\//, '') || 'dashboard';
}

/**
 * Fetch JSON data from a file path
 */
async function fetchData(path) {
  try {
    const response = await fetch(path);
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
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll('.navbar__link, .sidebar__nav-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Remove active class from all
    link.classList.remove('navbar__link--active', 'sidebar__nav-item--active');

    // Check if href matches current page
    const linkPage = href.replace(/\.html$/, '').replace(/^\//, '') || 'dashboard';
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
  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('navbar__links--open');
    toggle.setAttribute('aria-expanded', links.classList.contains('navbar__links--open'));
  });

  // Close nav when a link is clicked
  links.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('navbar__links--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Export for use in other scripts
window.DBStudio = window.DBStudio || {};
window.DBStudio.utils = {
  formatNumber,
  formatNumberAbbreviated,
  formatDate,
  timeAgo,
  getCurrentPage,
  fetchData,
  debounce,
  setActiveNavLink,
  initMobileNav
};
