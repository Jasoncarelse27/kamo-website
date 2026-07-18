/* Kamo. G website rendering and interactions */

(function() {
  'use strict';

  var artistConfig = null;

  document.addEventListener('DOMContentLoaded', initSite);

  async function initSite() {
    artistConfig = await KamoUtils.fetchData('/data/artist.json');
    if (!artistConfig) return;

    window.KamoSite = { hydrateSiteConfig: hydrateSiteConfig };
    hydrateSiteConfig(document);
    KamoUtils.initMobileNav();
    KamoUtils.setActiveNavLink();

    var observer = new MutationObserver(function() {
      hydrateSiteConfig(document);
      KamoUtils.initMobileNav();
      KamoUtils.setActiveNavLink();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    var page = KamoUtils.getCurrentPage();
    if (page === 'home') await loadHome();
    if (page === 'music') await loadMusic();
    if (page === 'media') await loadMedia();
    if (page === 'radio') await loadRadio();
    if (page === 'about') loadAbout();
    if (page === 'bookings') loadBookings();
  }

  function hydrateSiteConfig(root) {
    if (!artistConfig) return;
    root.querySelectorAll('[data-artist-name]').forEach(function(node) { node.textContent = artistConfig.name; });
    root.querySelectorAll('[data-artist-tagline]').forEach(function(node) { node.textContent = artistConfig.tagline; });
    root.querySelectorAll('[data-current-year]').forEach(function(node) { node.textContent = new Date().getFullYear(); });

    root.querySelectorAll('[data-booking-email]').forEach(function(node) {
      var email = artistConfig.bookingEmail;
      if (!email) {
        node.hidden = true;
        return;
      }
      node.hidden = false;
      node.textContent = email;
      if (node.tagName === 'A') node.href = 'mailto:' + email;
    });

    root.querySelectorAll('[data-social]').forEach(function(node) {
      var url = artistConfig.socials[node.dataset.social];
      if (!url) {
        node.hidden = true;
        return;
      }
      node.hidden = false;
      node.href = url;
    });
  }

  async function loadHome() {
    var releases = await KamoUtils.fetchData('/data/releases.json') || [];
    renderHomeHero();
    renderArtistHeadquarters(releases);
    renderReleaseCards(document.getElementById('recent-releases'), releases);
  }

  function renderHomeHero() {
    var container = document.getElementById('dashboard-hero');
    if (!container) return;
    var image = artistConfig.images.portraitJpeg;
    container.innerHTML = (image ? '<picture class="dashboard-hero__portrait"><source srcset="' + artistConfig.images.portraitWebp + '" type="image/webp"><img src="' + image + '" alt="Kamo. G official artist portrait" class="dashboard-hero__avatar"></picture>' : '') +
      '<div class="dashboard-hero__info">' +
        '<div class="dashboard-hero__tagline-ecosystem">Official artist website</div>' +
        '<h1 class="dashboard-hero__name">' + artistConfig.name + '</h1>' +
        '<p class="dashboard-hero__tagline">' + artistConfig.tagline + '</p>' +
        '<div class="dashboard-hero__actions">' +
          '<a href="/music" class="btn btn--gold">Listen</a>' +
          '<a href="/bookings" class="btn btn--outline">Book Kamo. G</a>' +
        '</div>' +
      '</div>';
  }

  function renderArtistHeadquarters(releases) {
    var container = document.getElementById('artist-hq');
    if (!container) return;
    var featured = releases.find(function(release) { return release.id === artistConfig.featuredReleaseId; });
    var cards = [];
    if (featured) cards.push({ icon: 'music', label: 'Verified release', value: featured.title + ' • ' + featured.year, href: featured.spotifyUrl, external: true });
    if (artistConfig.socials.spotify) cards.push({ icon: 'play', label: 'Listen on Spotify', value: 'Official artist profile', href: artistConfig.socials.spotify, external: true });
    if (artistConfig.socials.youtube) cards.push({ icon: 'play', label: 'Watch on YouTube', value: 'Official channel', href: artistConfig.socials.youtube, external: true });
    cards.push({ icon: 'calendar', label: 'Book Kamo. G', value: artistConfig.calComUrl ? 'Choose a time' : 'Email booking enquiries', href: '/bookings' });
    cards.push({ icon: 'download', label: 'Radio pack', value: 'Approved press downloads', href: '/radio' });

    container.innerHTML = cards.map(function(card) {
      return '<a class="quick-action" href="' + card.href + '"' + (card.external ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
        '<div class="quick-action__icon">' + KamoUtils.iconSVG(card.icon, 24) + '</div>' +
        '<div class="quick-action__label">' + card.label + '</div>' +
        '<div class="quick-action__value">' + card.value + '</div>' +
      '</a>';
    }).join('');
  }

  async function loadMusic() {
    var releases = await KamoUtils.fetchData('/data/releases.json') || [];
    var featured = releases.find(function(release) { return release.id === artistConfig.featuredReleaseId; }) || releases[0];
    var spotlight = document.getElementById('featured-release');
    if (spotlight) {
      spotlight.innerHTML = featured ?
        '<div class="ep-spotlight__info">' +
          '<span class="ep-spotlight__badge">Verified release</span>' +
          '<h2 class="ep-spotlight__title">' + featured.title + '</h2>' +
          '<p>' + featured.description + '</p>' +
          '<p class="release-facts">' + featured.type + ' • ' + featured.year + '</p>' +
          '<a href="' + featured.spotifyUrl + '" class="btn btn--gold" target="_blank" rel="noopener noreferrer">Open in Spotify</a>' +
        '</div>' +
        '<iframe class="spotify-embed" src="' + featured.spotifyEmbedUrl + '" title="Listen to ' + featured.title + ' on Spotify" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>' :
        emptyState('No release has been verified for publication yet.');
    }
    renderReleaseCards(document.getElementById('music-grid'), releases);
  }

  function renderReleaseCards(container, releases) {
    if (!container) return;
    if (!releases.length) {
      container.innerHTML = emptyState('Verified releases will appear here.');
      return;
    }
    container.innerHTML = releases.map(function(release) {
      return '<article class="track-card">' +
        '<div class="release-card__art">' + KamoUtils.iconSVG('music', 38) + '</div>' +
        '<div class="track-card__body">' +
          '<h3 class="track-card__title">' + release.title + '</h3>' +
          '<div class="track-card__meta"><span class="track-card__badge">' + release.type + '</span><span class="track-card__year">' + release.year + '</span></div>' +
          '<p class="track-card__description">' + release.description + '</p>' +
          '<a href="' + release.spotifyUrl + '" class="btn btn--gold btn--sm" target="_blank" rel="noopener noreferrer">Spotify</a>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  async function loadMedia() {
    var gallery = await KamoUtils.fetchData('/data/gallery.json') || [];
    var container = document.getElementById('media-gallery');
    if (!container) return;
    if (!gallery.length) {
      container.innerHTML = emptyState('Approved photographs will appear here.');
      return;
    }
    container.innerHTML = gallery.map(function(item, index) {
      return '<button class="media-gallery__item" type="button" data-lightbox-index="' + index + '" aria-label="Open ' + item.caption + '">' +
        '<picture><source srcset="' + item.webp + '" type="image/webp"><img src="' + item.jpeg + '" alt="' + item.alt + '" loading="lazy"></picture>' +
        '<span class="media-gallery__item-overlay"><span class="media-gallery__item-caption">' + item.caption + '</span></span>' +
      '</button>';
    }).join('');
    initLightbox(gallery);
  }

  function initLightbox(gallery) {
    var dialog = document.getElementById('media-lightbox');
    var image = dialog && dialog.querySelector('img');
    var caption = dialog && dialog.querySelector('[data-lightbox-caption]');
    if (!dialog || !image || !caption) return;
    document.querySelectorAll('[data-lightbox-index]').forEach(function(button) {
      button.addEventListener('click', function() {
        var item = gallery[Number(button.dataset.lightboxIndex)];
        image.src = item.jpeg;
        image.alt = item.alt;
        caption.textContent = item.caption;
        dialog.showModal();
      });
    });
    dialog.querySelector('[data-lightbox-close]').addEventListener('click', function() { dialog.close(); });
    dialog.addEventListener('click', function(event) { if (event.target === dialog) dialog.close(); });
  }

  function loadBookings() {
    var container = document.getElementById('booking-main');
    if (!container) return;
    var email = artistConfig.bookingEmail;
    if (artistConfig.calComUrl) {
      container.innerHTML = '<h2>Choose a booking time</h2><p>If the scheduler does not load, use the direct booking link or email.</p>' +
        '<div id="cal-embed" class="cal-embed" data-cal-url="' + artistConfig.calComUrl + '"></div>' +
        '<div class="booking-actions"><a class="btn btn--gold" href="' + artistConfig.calComUrl + '" target="_blank" rel="noopener noreferrer">Open booking calendar</a>' + emailButton(email) + '</div>';
    } else {
      container.innerHTML = '<div class="booking-fallback">' + KamoUtils.iconSVG('calendar', 42) +
        '<h2>Booking enquiries</h2><p>Public scheduling is not yet connected. Email the booking team with your event date, location and enquiry details.</p>' +
        (email ? emailButton(email) : '<p class="status-note">A public booking contact is awaiting confirmation.</p>') + '</div>';
    }
  }

  async function loadRadio() {
    var radio = await KamoUtils.fetchData('/data/radio.json');
    var container = document.getElementById('radio-main');
    if (!container || !radio) return;
    var groups = radio.groups || [];
    var html = '<h2 class="radio-main__title">' + radio.title + '</h2><p class="radio-main__description">' + radio.description + '</p>';
    if (!groups.length) html += emptyState('Approved public downloads are being prepared.');
    groups.forEach(function(group) {
      html += '<section class="download-group"><h3>' + group.title + '</h3>';
      if (!group.items.length) html += '<p class="status-note">' + group.emptyMessage + '</p>';
      else html += '<div class="download-grid">' + group.items.map(downloadCard).join('') + '</div>';
      html += '</section>';
    });
    if (radio.completePack) html += '<section class="download-group"><h3>Complete Pack</h3><div class="download-grid">' + downloadCard(radio.completePack) + '</div></section>';
    if (radio.lastUpdated) html += '<p class="radio-updated">Last updated: ' + radio.lastUpdated + '</p>';
    container.innerHTML = html;
  }

  function downloadCard(item) {
    var details = [item.format, KamoUtils.formatFileSize(item.sizeBytes), item.durationSeconds ? KamoUtils.formatDuration(item.durationSeconds) : '', item.dimensions || ''].filter(Boolean).join(' • ');
    return '<article class="download-card"><div class="download-card__icon">' + KamoUtils.iconSVG('download', 22) + '</div>' +
      '<div class="download-card__body"><h4>' + item.title + '</h4><p class="download-card__meta">' + details + '</p>' +
      (item.status ? '<span class="download-card__status">' + item.status + '</span>' : '') +
      (item.description ? '<p>' + item.description + '</p>' : '') + '</div>' +
      '<a class="btn btn--gold btn--sm" href="' + item.path + '" download>Download</a></article>';
  }

  function loadAbout() {
    var hero = document.getElementById('about-hero');
    if (hero && artistConfig.images.portraitJpeg) {
      hero.innerHTML = '<picture><source srcset="' + artistConfig.images.portraitWebp + '" type="image/webp"><img src="' + artistConfig.images.portraitJpeg + '" alt="Kamo. G official artist portrait" class="about-hero__image"></picture><div class="about-hero__overlay"><h1 class="about-hero__title">' + artistConfig.name + '</h1></div>';
    }
    var content = document.getElementById('about-content');
    if (content) content.innerHTML = '<div class="about-content__text"><h2>The story</h2>' + artistConfig.bio.map(function(paragraph) { return '<p>' + paragraph + '</p>'; }).join('') + '</div>';
    var timeline = document.getElementById('about-timeline');
    if (timeline) timeline.innerHTML = artistConfig.timeline.map(function(item) { return '<div class="timeline-item"><div class="timeline-item__label">' + item.label + '</div><p>' + item.text + '</p></div>'; }).join('');
  }

  function emailButton(email) {
    return '<a class="btn btn--gold" href="mailto:' + email + '">' + KamoUtils.iconSVG('mail', 16) + ' Email booking team</a>';
  }

  function emptyState(message) {
    return '<div class="empty-state">' + KamoUtils.iconSVG('info', 24) + '<p>' + message + '</p></div>';
  }
})();
