/* ============================================================
   DB STUDIO ARTIST ECOSYSTEM PLATFORM — MAIN ENTRY POINT
   Kamo G · Version 1
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile navigation
  if (window.DBStudio && window.DBStudio.utils) {
    window.DBStudio.utils.initMobileNav();
    window.DBStudio.utils.setActiveNavLink();
  }

  // Load page-specific modules based on current page
  const currentPage = getCurrentPage();

  switch (currentPage) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'music':
      loadMusicPage();
      break;
    case 'bookings':
      loadBookingsPage();
      break;
    case 'media':
      loadMediaPage();
      break;
    case 'radio':
      loadRadioPage();
      break;
    case 'about':
      loadAboutPage();
      break;
  }
});

/**
 * Load dashboard page data and render
 */
async function loadDashboard() {
  const dashboardData = await fetchData('data/dashboard.json');
  const artistData = await fetchData('data/artist.json');
  const releasesData = await fetchData('data/releases.json');

  if (!dashboardData || !artistData) return;

  renderDashboardHero(artistData);
  renderMetrics(dashboardData.metrics);
  renderQuickActions(dashboardData.quickActions);
  renderActivityFeed(dashboardData.recentActivity);
  renderRecentReleases(releasesData);

  // Initialize Chart.js sparklines if Chart.js is loaded
  if (typeof Chart !== 'undefined') {
    renderMetricCharts(dashboardData.metrics);
  }
}

/**
 * Render the dashboard hero/profile section
 */
function renderDashboardHero(artist) {
  const hero = document.getElementById('dashboard-hero');
  if (!hero) return;

  hero.innerHTML = `
    <img src="${artist.avatar}" alt="${artist.name}" class="dashboard-hero__avatar"
         onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2296%22 height=%2296%22><rect fill=%22%23222%22 width=%2296%22 height=%2296%22/><text fill=%22%23888%22 font-size=%2236%22 x=%2232%22 y=%2260%22>KG</text></svg>'">
    <div class="dashboard-hero__info">
      <h1 class="dashboard-hero__name">${artist.name}</h1>
      <p class="dashboard-hero__tagline">${artist.tagline} · ${artist.location}</p>
      <div class="dashboard-hero__actions">
        <a href="/music" class="btn btn--gold">View Music</a>
        <a href="/bookings" class="btn btn--outline">Book Now</a>
      </div>
    </div>
    <div class="dashboard-hero__stats">
      <div class="dashboard-hero__stat">
        <div class="dashboard-hero__stat-value">${formatNumberAbbreviated(artist.stats.monthlyListeners)}</div>
        <div class="dashboard-hero__stat-label">Listeners</div>
      </div>
      <div class="dashboard-hero__stat">
        <div class="dashboard-hero__stat-value">${formatNumberAbbreviated(artist.stats.totalStreams)}</div>
        <div class="dashboard-hero__stat-label">Streams</div>
      </div>
      <div class="dashboard-hero__stat">
        <div class="dashboard-hero__stat-value">${formatNumberAbbreviated(artist.stats.followers)}</div>
        <div class="dashboard-hero__stat-label">Followers</div>
      </div>
    </div>
  `;
}

/**
 * Render metric cards
 */
function renderMetrics(metrics) {
  const container = document.getElementById('metrics-row');
  if (!container) return;

  container.innerHTML = metrics.map(metric => `
    <div class="dashboard-card" data-metric-id="${metric.id}">
      <div class="dashboard-card__header">
        <div class="dashboard-card__icon">${getIconHTML(metric.icon)}</div>
        <span class="dashboard-card__trend dashboard-card__trend--${metric.changeDirection}">
          ${metric.changeDirection === 'up' ? '↑' : '↓'} ${metric.change}%
        </span>
      </div>
      <div class="dashboard-card__label">${metric.label}</div>
      <div class="dashboard-card__value">${metric.prefix}${formatNumberAbbreviated(metric.value)}${metric.suffix}</div>
      <div class="dashboard-card__chart">
        <canvas id="chart-${metric.id}" width="200" height="48"></canvas>
      </div>
    </div>
  `).join('');
}

/**
 * Render Chart.js sparkline charts on metric cards
 */
function renderMetricCharts(metrics) {
  metrics.forEach(metric => {
    const canvas = document.getElementById('chart-' + metric.id);
    if (!canvas) return;

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: metric.chartData.map(() => ''),
        datasets: [{
          data: metric.chartData,
          borderColor: metric.changeDirection === 'up' ? '#10b981' : '#ef4444',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        elements: {
          point: { radius: 0 }
        }
      }
    });
  });
}

/**
 * Render quick action cards
 */
function renderQuickActions(actions) {
  const container = document.getElementById('quick-actions');
  if (!container) return;

  container.innerHTML = actions.map(action => `
    <a href="${action.link}" class="quick-action">
      <div class="quick-action__icon">${getIconHTML(action.label === 'Latest Release' ? 'music' : action.label === 'Upcoming Show' ? 'calendar' : 'download')}</div>
      <div class="quick-action__label">${action.label}</div>
      <div class="quick-action__value">${action.value}</div>
    </a>
  `).join('');
}

/**
 * Render activity feed
 */
function renderActivityFeed(activities) {
  const container = document.getElementById('activity-feed');
  if (!container) return;

  container.innerHTML = `
    <div class="activity-feed__header">
      <h3 class="activity-feed__title">Recent Activity</h3>
    </div>
    ${activities.map(activity => `
      <div class="activity-item">
        <div class="activity-item__dot activity-item__dot--${activity.type}"></div>
        <div class="activity-item__content">
          <div class="activity-item__text">${activity.text || activity.title}</div>
          <div class="activity-item__date">${formatDate(activity.date)}</div>
        </div>
      </div>
    `).join('')}
  `;
}

/**
 * Render recent releases on dashboard
 */
function renderRecentReleases(releases) {
  const container = document.getElementById('recent-releases');
  if (!container) return;

  const recent = releases.slice(0, 4);

  container.innerHTML = recent.map(release => `
    <div class="track-card ${release.type === 'ep' ? 'track-card--ep' : ''}">
      <img src="${release.coverArt}" alt="${release.title}" class="track-card__cover"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22><rect fill=%22%23222%22 width=%22300%22 height=%22300%22/><text fill=%22%23888%22 font-size=%2216%22 x=%2250%22 y=%22150%22>${release.title}</text></svg>'">
      <div class="track-card__body">
        <div class="track-card__title">${release.title}</div>
        <div class="track-card__meta">
          ${release.type === 'ep' ? '<span class="track-card__badge track-card__badge--ep">EP</span>' : ''}
          <span class="track-card__year">${release.year}</span>
        </div>
        <div class="track-card__actions">
          ${release.spotifyUrl ? `<a href="${release.spotifyUrl}" target="_blank" class="btn btn--gold btn--sm">Listen</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Load music page
 */
async function loadMusicPage() {
  const releases = await fetchData('data/releases.json');
  if (!releases) return;

  renderMusicGrid(releases);
  initMusicFilters(releases);
}

function renderMusicGrid(releases) {
  const container = document.getElementById('music-grid');
  if (!container) return;

  container.innerHTML = releases.map(release => `
    <div class="track-card ${release.type === 'ep' ? 'track-card--ep' : ''}" data-type="${release.type}">
      <img src="${release.coverArt}" alt="${release.title}" class="track-card__cover"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22><rect fill=%22%23222%22 width=%22300%22 height=%22300%22/><text fill=%22%23888%22 font-size=%2216%22 x=%2250%22 y=%22150%22>${release.title}</text></svg>'">
      <div class="track-card__body">
        <div class="track-card__title">${release.title}</div>
        <div class="track-card__meta">
          ${release.type === 'ep' ? '<span class="track-card__badge track-card__badge--ep">EP</span>' : ''}
          <span class="track-card__year">${release.year}</span>
        </div>
        <div class="track-card__actions">
          ${release.spotifyUrl ? `<a href="${release.spotifyUrl}" target="_blank" class="btn btn--gold btn--sm">Spotify</a>` : ''}
          ${release.youtubeUrl ? `<a href="${release.youtubeUrl}" target="_blank" class="btn btn--dark btn--sm">YouTube</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function initMusicFilters(releases) {
  const tabs = document.querySelectorAll('.filter-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Update active tab
      tabs.forEach(t => t.classList.remove('filter-tab--active'));
      this.classList.add('filter-tab--active');

      // Filter releases
      const filter = this.dataset.filter;
      const cards = document.querySelectorAll('.track-card');

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Load bookings page
 */
async function loadBookingsPage() {
  // Bookings page is primarily a Typeform embed placeholder
  // No dynamic data loading needed for Sprint 1
}

/**
 * Load media page
 */
async function loadMediaPage() {
  const gallery = await fetchData('data/gallery.json');
  if (!gallery) return;

  renderGallery(gallery);
}

function renderGallery(items) {
  const container = document.getElementById('media-gallery');
  if (!container) return;

  const images = items.filter(item => item.type === 'image');

  container.innerHTML = images.map(item => `
    <div class="media-gallery__item">
      <img src="${item.src}" alt="${item.alt}"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect fill=%22%23222%22 width=%22400%22 height=%22300%22/><text fill=%22%23888%22 font-size=%2214%22 x=%2280%22 y=%22150%22>Photo</text></svg>'">
      <div class="media-gallery__item-overlay">
        <div class="media-gallery__item-caption">${item.caption}</div>
      </div>
    </div>
  `).join('');
}

/**
 * Load radio pack page
 */
async function loadRadioPage() {
  const radio = await fetchData('data/radio.json');
  if (!radio) return;

  renderRadioPack(radio);
}

function renderRadioPack(radio) {
  const container = document.getElementById('radio-main');
  if (!container) return;

  container.innerHTML = `
    <h1 class="radio-main__title">${radio.title}</h1>
    <p class="radio-main__description">${radio.description}</p>

    <div class="radio-contents">
      <h3 class="radio-contents__title">Pack Contents</h3>
      <ul class="radio-contents__list">
        ${radio.contents.map(item => `<li class="radio-contents__item">${item}</li>`).join('')}
      </ul>
    </div>

    <div class="radio-actions">
      <a href="${radio.epkDownloadUrl}" target="_blank" class="btn btn--gold btn--lg">Download Full EPK</a>
      <a href="${radio.bioPdfUrl}" target="_blank" class="btn btn--outline btn--lg">View Bio (PDF)</a>
      <a href="${radio.audioDownloadUrl}" target="_blank" class="btn btn--dark btn--lg">Download Audio</a>
    </div>

    <p class="mt-lg text-muted" style="font-size: 12px;">Last updated: ${formatDate(radio.lastUpdated)}</p>
  `;
}

/**
 * Load about page
 */
async function loadAboutPage() {
  const artist = await fetchData('data/artist.json');
  if (!artist) return;

  renderAboutPage(artist);
}

function renderAboutPage(artist) {
  const hero = document.getElementById('about-hero');
  const content = document.getElementById('about-content');
  const stats = document.getElementById('about-stats');

  if (hero) {
    hero.innerHTML = `
      <img src="${artist.coverImage}" alt="${artist.name}" class="about-hero__image"
           onerror="this.style.display='none'">
      <div class="about-hero__overlay">
        <h1 class="about-hero__title">${artist.name}</h1>
      </div>
    `;
  }

  if (content) {
    content.innerHTML = `
      <div class="about-content__text">
        <p>${artist.bio}</p>
        <p>Based in ${artist.location}, ${artist.name} has been making waves in the ${artist.genre} scene with a distinctive sound that blends raw storytelling with genre-defying production.</p>
        <p>With over ${formatNumber(artist.stats.totalStreams)} streams worldwide and a growing fanbase, ${artist.name} is establishing themselves as one of the most exciting artists to emerge from South Africa's new wave.</p>
      </div>
      <div class="about-content__image">
        <img src="${artist.avatar}" alt="${artist.name}"
             onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22500%22 height=%22500%22><rect fill=%22%23222%22 width=%22500%22 height=%22500%22/><text fill=%22%23888%22 font-size=%2220%22 x=%22180%22 y=%22250%22>Photo</text></svg>'">
      </div>
    `;
  }

  if (stats) {
    stats.innerHTML = `
      <div class="about-stat">
        <div class="about-stat__value">${formatNumberAbbreviated(artist.stats.monthlyListeners)}</div>
        <div class="about-stat__label">Monthly Listeners</div>
      </div>
      <div class="about-stat">
        <div class="about-stat__value">${formatNumberAbbreviated(artist.stats.totalStreams)}</div>
        <div class="about-stat__label">Total Streams</div>
      </div>
      <div class="about-stat">
        <div class="about-stat__value">${formatNumberAbbreviated(artist.stats.followers)}</div>
        <div class="about-stat__label">Followers</div>
      </div>
      <div class="about-stat">
        <div class="about-stat__value">${artist.stats.releases}</div>
        <div class="about-stat__label">Releases</div>
      </div>
    `;
  }
}

/**
 * Helper: Get icon HTML (simple unicode/emoji icons)
 */
function getIconHTML(icon) {
  var icons = {
    'headphones': 'headphones',
    'music': 'music',
    'users': 'users',
    'activity': 'activity',
    'calendar': 'calendar',
    'download': 'download',
    'play': 'play',
    'star': 'star'
  };
  return iconSVG(icons[icon] || 'music', 18);
}
