/* Kamo. G website rendering and progressive interactions */

(function() {
  'use strict';

  var artistConfig = null;

  document.addEventListener('DOMContentLoaded', initSite);

  async function initSite() {
    KamoUtils.initMobileNav();
    KamoUtils.setActiveNavLink();
    initAudioPreviews(document);

    var page = KamoUtils.getCurrentPage();
    if (page === 'media') await loadMedia();

    artistConfig = await KamoUtils.fetchData('/data/artist.json');
    window.KamoSite = { hydrateSiteConfig: hydrateSiteConfig };
    if (!artistConfig) return;

    hydrateSiteConfig(document);
    if (page === 'music') await loadMusic();
    if (page === 'radio') await loadRadio();
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

  async function loadMusic() {
    var releases = await KamoUtils.fetchData('/data/releases.json') || [];
    var featured = releases.find(function(release) { return release.id === artistConfig.featuredReleaseId; }) || releases[0];
    var spotlight = document.getElementById('featured-release');
    if (!spotlight || !featured) return;
    spotlight.innerHTML = '<div class="ep-spotlight__info">' +
      '<span class="ep-spotlight__badge">Current release</span>' +
      '<h2 class="ep-spotlight__title">' + featured.title + '</h2>' +
      '<p>' + featured.description + '</p>' +
      '<p class="release-facts">' + featured.type + ' • ' + featured.year + '</p>' +
      '<a href="' + featured.spotifyUrl + '" class="btn btn--gold" target="_blank" rel="noopener noreferrer">Listen on Spotify</a>' +
      '</div><iframe class="spotify-embed" src="' + featured.spotifyEmbedUrl + '" width="100%" height="352" title="Listen to ' + featured.title + ' by Kamo. G on Spotify" loading="lazy" allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>';
  }

  async function loadMedia() {
    var gallery = await KamoUtils.fetchData('/data/gallery.json');
    if (!gallery || !gallery.length) {
      initLightbox(defaultGallery());
      return;
    }
    var container = document.getElementById('media-gallery');
    if (!container) return;
    container.innerHTML = gallery.map(function(item, index) {
      return '<article class="media-gallery__entry"><button class="media-gallery__item" type="button" data-lightbox-index="' + index + '" aria-label="Open ' + item.caption + '">' +
        '<picture><source srcset="' + item.webp + '" type="image/webp"><img src="' + item.jpeg + '" width="1080" height="1350" alt="' + item.alt + '" loading="lazy" decoding="async"></picture>' +
        '<span class="media-gallery__item-overlay"><span class="media-gallery__item-caption">' + item.caption + '</span></span></button>' +
        '<a class="media-gallery__download" href="' + item.download + '" download>Download original</a></article>';
    }).join('');
    initLightbox(gallery);
  }

  function defaultGallery() {
    return [
      { jpeg: '/assets/images/press/kamo-g-official-artist-portrait.jpg', alt: 'Portrait of Kamo. G wearing a black bucket hat and jacket', caption: 'Kamo. G — Official Artist Portrait' },
      { jpeg: '/assets/images/press/kamo-g-press-portrait.jpg', alt: 'Kamo. G in a black bucket hat and jacket against a green background', caption: 'Kamo. G — Press Portrait' }
    ];
  }

  function initLightbox(gallery) {
    var dialog = document.getElementById('media-lightbox');
    var image = dialog && dialog.querySelector('img');
    var caption = dialog && dialog.querySelector('[data-lightbox-caption]');
    var closeButton = dialog && dialog.querySelector('[data-lightbox-close]');
    if (!dialog || !image || !caption || !closeButton || dialog.dataset.ready === 'true') return;
    dialog.dataset.ready = 'true';
    var returnFocus = null;

    document.querySelectorAll('[data-lightbox-index]').forEach(function(button) {
      button.addEventListener('click', function() {
        var item = gallery[Number(button.dataset.lightboxIndex)];
        if (!item) return;
        returnFocus = button;
        image.src = item.jpeg;
        image.alt = item.alt;
        caption.textContent = item.caption;
        dialog.showModal();
        closeButton.focus();
      });
    });
    closeButton.addEventListener('click', function() { dialog.close(); });
    dialog.addEventListener('click', function(event) { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function() {
      if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
    });
  }

  function loadBookings() {
    var container = document.getElementById('booking-main');
    if (!container) return;

    /* Booking calendar. The canonical destination is "calComUrl" in
       data/artist.json (currently https://cal.com/kamo-g/booking). Change it
       there, and in the static fallback in pages/bookings.html, to repoint
       bookings. If it is ever blanked, the site falls back to email only and
       makes no availability claim. Cal.com owns availability, duration and
       location -- do not restate them here or they will go stale. */
    var calUrl = (artistConfig.calComUrl || '').trim();

    if (calUrl) {
      container.innerHTML = '<div class="booking-fallback"><h2>Check availability</h2>' +
        '<p>Choose a time that suits your event. Cal.com sends both you and the booking team a confirmation email.</p>' +
        '<a class="btn btn--gold" href="' + calUrl + '" target="_blank" rel="noopener noreferrer">' +
        KamoUtils.iconSVG('calendar', 16) + ' Book Kamo. G</a>' +
        (artistConfig.bookingEmail ? '<p>Prefer email? Write to ' + emailLink(artistConfig.bookingEmail) + '.</p>' : '') +
        '</div>';
      return;
    }

    if (!artistConfig.bookingEmail) return;
    container.innerHTML = '<div class="booking-fallback"><h2>Booking enquiries</h2>' +
      '<p>Email the booking team directly. No form, public calendar or availability claim is used on this site.</p>' +
      emailButton(artistConfig.bookingEmail) + '</div>';
  }

  async function loadRadio() {
    var radio = await KamoUtils.fetchData('/data/radio.json');
    var container = document.getElementById('radio-main');
    if (!container || !radio) return;
    var groups = radio.groups || [];
    var html = '<h2 class="radio-main__title">' + radio.title + '</h2><p class="radio-main__description">' + radio.description + '</p>';
    groups.forEach(function(group) {
      html += '<section class="download-group"><h3>' + group.title + '</h3>';
      if (!group.items.length) html += '<p class="status-note">' + group.emptyMessage + '</p>';
      else html += '<div class="download-grid">' + group.items.map(downloadCard).join('') + '</div>';
      html += '</section>';
    });
    if (radio.completePack) html += '<section class="download-group"><h3>Complete Pack</h3><div class="download-grid">' + downloadCard(radio.completePack) + '</div></section>';
    if (radio.lastUpdated) html += '<p class="radio-updated">Last updated: ' + radio.lastUpdated + '</p>';
    container.innerHTML = html;
    initAudioPreviews(container);
  }

  function downloadCard(item) {
    var details = [item.format, KamoUtils.formatFileSize(item.sizeBytes), item.durationSeconds ? KamoUtils.formatDuration(item.durationSeconds) : '', item.dimensions || ''].filter(Boolean).join(' • ');
    var isAudio = item.format === 'M4A';
    var audio = isAudio ? '<audio class="download-card__audio" controls preload="metadata" data-audio-preview aria-label="Play ' + item.title + '"><source src="' + item.path + '" type="audio/mp4">Your browser does not support audio playback. <a href="' + item.path + '">Download this voice note</a>.</audio>' : '';
    return '<article class="download-card' + (isAudio ? ' download-card--audio' : '') + '"><div class="download-card__icon" aria-hidden="true">' + KamoUtils.iconSVG(isAudio ? 'play' : 'download', 22) + '</div>' +
      '<div class="download-card__body"><h4>' + item.title + '</h4><p class="download-card__meta">' + details + '</p>' +
      (item.status ? '<span class="download-card__status">' + item.status + '</span>' : '') +
      (item.description ? '<p>' + item.description + '</p>' : '') + audio + '</div>' +
      '<a class="btn btn--gold btn--sm" href="' + item.path + '" download>Download</a></article>';
  }

  function initAudioPreviews(root) {
    root.querySelectorAll('[data-audio-preview]').forEach(function(player) {
      if (player.dataset.ready === 'true') return;
      player.dataset.ready = 'true';
      player.addEventListener('play', function() {
        document.querySelectorAll('[data-audio-preview]').forEach(function(otherPlayer) {
          if (otherPlayer !== player && !otherPlayer.paused) otherPlayer.pause();
        });
      });
    });
  }

  function emailButton(email) {
    return '<a class="btn btn--gold" href="mailto:' + email + '">' + KamoUtils.iconSVG('mail', 16) + ' ' + email + '</a>';
  }

  function emailLink(email) {
    return '<a href="mailto:' + email + '">' + email + '</a>';
  }
})();
