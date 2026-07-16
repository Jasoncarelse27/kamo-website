# Kamo G Website Handover

## Project identity

- Project: Kamo G — Son of Moses Experience
- Purpose: public artist website for music, bookings, media, radio resources, and artist storytelling
- Official remote: `https://github.com/Jasoncarelse27/kamo-website.git`
- Clean recovery workspace: `/Users/jasoncarelse/Documents/kamo-website-clean-20260716`
- Recovery branch: `recovery/kamo-handover-20260716`
- Recovery base: `d1c20d826c62b6671c171e590386754f94ca5f2c`
- Recovery evidence: `RECOVERY_MANIFEST.md`

The damaged checkout was preserved separately and was not repaired in place. Filesystem comparison proved that all 49 ordinary project files already matched the clean remote base; no unpublished website bytes required recovery.

## Routes

| Route | Purpose |
|---|---|
| `/` | Artist dashboard and Son of Moses introduction |
| `/music` | Discography and streaming links |
| `/bookings` | Booking contact and event summary |
| `/media` | Photography and video placeholders |
| `/radio` | Radio pack and press resources |
| `/about` | Biography, narrative, and artist statistics |

## Implemented features

- Responsive desktop and mobile navigation
- Artist biography and Son of Moses narrative
- Music catalogue rendering and filtering
- Booking contact path
- Media gallery
- Radio-pack presentation
- Social-profile links
- JSON-driven dashboard metrics and activity
- Netlify clean-route redirects
- Image fallbacks and alternative text

## Client and launch statuses

| Area | Status | Evidence / required action |
|---|---|---|
| Final domain | Unverifiable | No approved custom domain is recorded in the repository or accessible Netlify session. |
| Booking email | Unverifiable | `misfitrecords2@gmail.com` is displayed, but final client approval and mailbox ownership are not documented. |
| Cal.com | Technically incomplete | No Cal.com integration or client-owned scheduling link exists in this repository. |
| Tour information | Waiting for client | Four future/past event records require confirmation; two ticket links use `tickets.example.com` and two are empty. |
| Radio pack | Waiting for client | Three Google Drive URLs are placeholders and no downloadable radio assets are stored locally. Supply final clean-only broadcast assets. |
| Streaming links | Waiting for client | Most release URLs use human-readable placeholder slugs. The Oxygen Tank URLs use opaque IDs but were not externally approved during recovery. |
| Oxygen Tank artwork | Waiting for client | `data/releases.json` references missing `assets/images/releases/oxygen-tank.jpg`; the site currently shows its built-in fallback. |
| Photography approval | Unverifiable | Artist and gallery images exist, but final approval and usage rights are not recorded. |
| Brand-partnership content | Waiting for client | No approved partnership section or copy exists. |
| Social links | Unverifiable | Instagram, YouTube, Spotify, and Apple Music profile URLs exist but ownership/finality is not documented. |
| Audience statistics | Unverifiable | Listener, stream, follower, engagement, and activity values are static JSON data, not live analytics. |
| Analytics | Technically incomplete | Chart.js visualises static data; no production analytics property or tracking integration is configured. |
| Privacy and consent | Technically incomplete | No privacy page, cookie notice, or consent implementation exists. |
| Open Graph metadata | Technically incomplete | Page descriptions exist, but Open Graph and social-sharing configuration is absent. |
| Favicon | Technically incomplete | No approved favicon file or explicit favicon reference exists. |
| Cake N Tea | Out of scope | No current repository evidence includes it in this website scope. |

## Placeholder report

- `data/events.json`
  - `https://tickets.example.com/zone6-live`
  - `https://tickets.example.com/arts-fest`
  - Two empty `ticketUrl` values
  - All event dates, venues, and ticket availability require client confirmation
- `data/radio.json`
  - `https://drive.google.com/drive/folders/kamo-g-epk`
  - `https://drive.google.com/file/d/kamo-g-bio`
  - `https://drive.google.com/drive/folders/kamo-g-audio`
- `data/releases.json` and `pages/music.html`
  - Human-readable Spotify, Apple Music, YouTube, and SoundCloud placeholder paths for most releases
  - Missing `assets/images/releases/oxygen-tank.jpg`
- `pages/media.html`
  - Two visual video placeholders without final embeds or approved URLs
- `pages/bookings.html`
  - Booking form remains a contact-email placeholder; no Typeform or scheduling integration is active
- No `TODO` or `FIXME` markers were found in ordinary project source.

Do not replace these values until verified final content is supplied.

## Netlify status

- Known public URL: `https://helpful-mermaid-92162b.netlify.app`
- Repository configuration: five status-200 rewrites in `netlify.toml`
- Build command: none
- Publish directory: repository root (`.`)
- Expected production branch: `main`
- Site ID: Unverifiable
- Team/account owner: Unverifiable
- Linked Git repository: Unverifiable in Netlify
- Current production deploy and Git commit: Unverifiable
- Custom domains: Unverifiable
- Environment-variable names: Unverifiable
- Dashboard rollback availability: Unverifiable

The available Netlify dashboard session was unauthenticated. No site was linked, deployed, saved, or reconfigured during recovery.

## Account and credential ownership transfers

Transfer or confirm ownership for these systems without placing credentials in Git:

- GitHub repository administration
- Netlify site and team
- Domain registrar and DNS provider
- Booking mailbox
- Client-owned Cal.com account, if scheduling remains in scope
- Analytics and search-console properties
- Radio/EPK file storage
- Instagram, YouTube, Spotify for Artists, Apple Music for Artists, and other approved profiles

## Launch checklist

- [ ] Approve final domain and confirm registrar/DNS ownership
- [ ] Confirm booking email and client mailbox access
- [ ] Decide whether client-owned Cal.com scheduling is required
- [ ] Replace and verify all placeholder streaming links
- [ ] Confirm tour dates, venues, ticket links, and publication status
- [ ] Supply approved Oxygen Tank artwork
- [ ] Supply and test final clean radio-pack downloads
- [ ] Approve photography and usage rights
- [ ] Supply or remove brand-partnership content from scope
- [ ] Approve displayed biography, statistics, and activity claims
- [ ] Add approved favicon and social-sharing metadata
- [ ] Decide and implement analytics, privacy, and consent requirements
- [ ] Verify Netlify ownership, Git linkage, production branch, and rollback access
- [ ] Run final desktop/mobile, route, link, asset, and download checks
- [ ] Obtain written client launch approval
- [ ] Deploy through the verified production owner; do not change DNS until the deploy is approved

## Rollback approach

1. Keep `main` unchanged until the recovery branch is reviewed and approved.
2. Use a normal Git revert for any merged change that must be undone; do not force-push production history.
3. After Netlify ownership is verified, record the last approved deploy ID before launch.
4. If a production issue occurs, restore the last approved Netlify deploy and then revert the corresponding Git change.
5. Treat DNS rollback as a separately approved owner action.

## Post-launch support

- Monitor route, asset, booking-email, and download availability
- Verify analytics and search-console collection after consent requirements are met
- Review streaming, tour, press, and partnership content on an agreed schedule
- Maintain current radio assets and approved photography
- Confirm domain renewal, DNS, GitHub, Netlify, and account ownership remain with the client
- Keep a documented last-known-good deploy and test rollback access periodically

## Explicit scope boundary

`/portal/kamo` remains inside shared DB infrastructure. It was not read, copied, edited, built, committed, deployed, or included in this repository recovery. Portal migration is a separate future task.
