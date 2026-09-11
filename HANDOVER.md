# Kamo. G Website Handover

Last updated: 11 September 2026

## Project identity and safety

- Project: Kamo. G public artist website
- Official remote: `https://github.com/Jasoncarelse27/kamo-website.git`
- Workspace: canonical clean repository
- Delivery branch: `feature/kamo-client-ready-20260718`
- Recovery base: `d1c20d826c62b6671c171e590386754f94ca5f2c`
- Recovery evidence: `RECOVERY_MANIFEST.md`

The damaged checkout remains preserved and read-only. A checksum comparison found no unrecovered client-ready files. Its supplied portrait files are byte-identical to the approved originals already imported here; its other unique assets and data belong to the retired placeholder prototype and were not copied.

## Verified public information

- Public artist spelling: **Kamo. G**; “Kamo G” is retained only where useful for search and filenames.
- Spotify artist: `https://open.spotify.com/artist/2oitpnPzsI6zqRMRqYNNgK`
- Verified featured album: **OXYGEN TANK** (2023)
- Spotify album: `https://open.spotify.com/album/4x34u2u5h0eARAbcn93FRd`
- YouTube: `https://www.youtube.com/@kamogelononyane`
- Supplied Instagram destination: `https://www.instagram.com/p/DSvTFaXjGuW/`
- Booking and press email: `kgnon6@gmail.com`

The biography uses approved project material and restrained factual language. “Son of Moses” is presented as an artistic identity/campaign concept, not as a released track.

## Public implementation

- `/` leads with the single OXYGEN TANK campaign, immediate Spotify and booking actions, and three compact Latest cards for the release, official YouTube channel, and radio pack.
- `/music` contains one positively matched current release, one Spotify-supported album embed, and a link to the official artist page.
- `/media` contains only the two supplied photographs, original-file downloads, an accessible native lightbox with focus restoration, the official YouTube channel, and the supplied Instagram post.
- `/radio` provides native metadata-preloaded previews for the clean and explicit M4As while retaining every verified direct download. A small enhancement pauses the other preview when one begins playing.
- `/bookings` uses the functional `mailto:kgnon6@gmail.com` enquiry fallback and lists the event details organisers should include. No form, availability claim, response-time promise, or public calendar is exposed.
- `/about` uses only approved biography material, the current release, verified official destinations, and a booking action.
- Metadata, meaningful page titles, approved social-image references, image alternatives, safe external-link attributes, responsive navigation, mobile-menu Escape handling, and body scroll control are present across the routes.

No analytics or tracking has been added. The approved public domain is `kamog.online`, so every page now carries an absolute `rel=canonical`, `og:url`, and absolute Open Graph/Twitter image URLs on that domain. `robots.txt`, `sitemap.xml`, and a branded `404.html` are published. These values are correct only once `kamog.online` actually serves the site; they are inert until then.

## Removed prototype content

The public site no longer contains:

- fabricated listeners, streams, followers, engagement rates, growth percentages, activity, playlist additions, or chart history
- Chart.js or generated analytics charts
- fictional releases, artwork, collaborations, stream counts, dates, or track counts
- sample shows, venues, ticket links, and “upcoming” event claims
- fake Spotify slugs, video IDs, Google Drive links, or download inventories
- invented gallery/video captions, worldwide/major-stage/editorial-playlist/award claims
- copy claiming that OXYGEN TANK is upcoming

Obsolete `data/dashboard.json`, `data/events.json`, fictional release/gallery images, and verification screenshots were removed from the feature branch.

## Future verified events

No events section is rendered because there are no approved public dates. If verified dates are supplied later, keep the section absent when there are zero records and use only this small record shape:

```json
{
  "date": "YYYY-MM-DD",
  "city": "Verified city",
  "venue": "Verified venue",
  "eventType": "Verified event type",
  "ticketUrl": null,
  "enquiryUrl": null
}
```

Use either `ticketUrl` or `enquiryUrl` as appropriate, and publish no record until every displayed field and destination has been approved. An empty events framework or placeholder section is not required.

## Client assets and radio pack

The detailed source, derivative, metadata, checksum, and publication record is in `CLIENT_ASSET_MANIFEST.md`. The downloadable pack record and ZIP verification are in `RADIO_PACK_MANIFEST.md`.

Current public pack:

- Kamo. G — Official Artist Portrait (original JPEG)
- Kamo. G — Press Portrait (original JPEG)
- Kamo. G Radio Voice Note — Clean (original M4A; 45.632 seconds)
- Kamo. G Radio Voice Note — Explicit (original M4A; 64.832 seconds)
- Kamo. G Radio Pack — Audio and Photography (verified ZIP containing all four files)

The client identified and approved `Kamo-clean.m4a` and `Kamo-dirty.m4a` as the clean and explicit Kamo. G radio voice notes. Their SHA-256 identities matched the previously catalogued recordings before copying. The public M4As retain the original bytes and measured metadata; no transcoding, remuxing, trimming, normalization, or tag changes were made.

The public original JPEG downloads retain EXIF/IPTC/XMP/Photoshop profiles and embedded thumbnails. A targeted metadata review reported no values in the checked GPS, email, artist/creator, copyright, or camera-serial fields; it was not an assertion that every embedded field is empty. The originals were not altered or stripped.

## Booking status

- Confirmed public email fallback: `kgnon6@gmail.com`
- Optional Kamo-owned scheduling URL: **pending client supply/confirmation**
- Scheduling account owner: **not yet documented**
- Form or inline embed: not implemented
- External scheduling link: not published
- **Activation point:** `calComUrl` in `data/artist.json` (currently `""`). Setting it to Kamo's public Cal.com link switches `/bookings` from the email fallback to a calendar CTA. `loadBookings()` in `js/main.js` reads it; no code change is needed at launch.
- Fallback: active as `mailto:kgnon6@gmail.com` on the booking page; shared booking actions route to that page

No DB Reply, project-review, personal, studio-administration, or fabricated calendar URL is present.

## Deployment ownership and boundaries

- Production branch is expected to remain `main`.
- Netlify build command: none; publish directory: repository root.
- A Deploy Preview may be created only from the delivery branch after validation and repository linkage checks.
- Approved public domain: `kamog.online` (registration processing as of 11 September 2026). DNS is **not** configured and Production is **not** deployed.
- The DNS owner, Netlify team/site owner, and Production launch approver still require confirmation before launch.
- `/portal/kamo`, DB Assistant, DB Reply, Cloudflare, DNS, and Production Netlify are outside this repository handover and must remain untouched.

## Remaining client decisions

Only these concrete inputs remain:

1. Supply and confirm the public Kamo-owned Cal.com event URL, then set it as `calComUrl` in `data/artist.json`.
2. Supply approved biography/press documents, cover artwork, clean audio masters, or additional photography only if they should be added to the public pack.
3. Confirm Netlify ownership, DNS ownership, and the Production launch approver. (Public domain is settled: `kamog.online`.)
4. Confirm whether analytics is required and, if so, provide the owned property and consent/privacy requirements.

## Launch checklist

- [x] Remove fabricated and placeholder public content
- [x] Verify official artist destinations and featured album
- [x] Import and optimize the two supplied photographs
- [x] Publish working individual photo downloads and an integrity-tested ZIP
- [x] Publish the approved clean and explicit radio voice notes without conversion
- [x] Preserve an honest booking-email fallback
- [x] Validate the exact final feature-branch tree locally
- [x] Resolve canonical/Open Graph metadata against the approved domain
- [x] Publish `robots.txt`, `sitemap.xml`, and a branded `404.html`
- [ ] Record and approve the final Kamo-owned Cal.com URL, then set `calComUrl`
- [ ] Confirm DNS and Netlify account ownership
- [ ] Obtain written client launch approval
- [ ] Merge and deploy Production through the verified owner (outside this handover task)

Use normal review and revert workflows; do not rewrite shared history or force-push. This feature branch is a release candidate, not authorization to merge or publish Production.


## Operations

Facts needed to run the site after launch. **No credentials belong in this repository.**

### Hosting and deployment

| Item | Value |
|---|---|
| Production domain | `kamog.online` (registration processing; DNS not yet pointed) |
| Host | Netlify, site slug `kamo-g` |
| Pre-domain URL | `https://kamo-g.netlify.app` |
| Repository | `https://github.com/Jasoncarelse27/kamo-website` |
| Production branch | `main` |
| Delivery branch | `feature/kamo-client-ready-20260718` (PR #1) |
| Build command | none — static site |
| Publish directory | repository root (`.`) |

Deployment procedure: merge the delivery branch into `main`; Netlify publishes `main` automatically. Every push to the delivery branch republishes the Deploy Preview at `https://deploy-preview-1--kamo-g.netlify.app`. Roll back from Netlify's Deploys list by publishing a previous deploy — there is no build step to reproduce.

### Routing

`netlify.toml` rewrites the five clean routes (`/music`, `/bookings`, `/media`, `/radio`, `/about`) to their files in `pages/`. Adding a page means adding both the file and its rewrite, plus a `sitemap.xml` entry. The underlying `/pages/*.html` paths stay reachable, which is why every page carries a canonical tag pointing at the clean route.

### Updating content

Most public content is data, not markup:

| To change | Edit |
|---|---|
| Name, bio, booking email, social links, **Cal.com URL** | `data/artist.json` |
| Current release and Spotify embed | `data/releases.json` |
| Photo gallery and download links | `data/gallery.json` |
| Radio pack downloads and metadata | `data/radio.json` |
| Navigation and footer | `components/navbar.html`, `components/footer.html` |

Images live in `assets/images/press/` (serve both `.webp` and `.jpg`, 1080×1350, and keep the `width`/`height` attributes so layout does not shift). Downloadables live in `assets/downloads/kamo-g-radio-pack/`. Audio is served as original M4A with no transcoding. After editing any JSON file, confirm it still parses (`jq empty data/*.json`) — a malformed file silently blanks that section.

### Maintenance considerations

- No dependencies, build, CMS, or database — nothing to patch on a schedule.
- Third-party surfaces that can break without warning: the Spotify embed, Google Fonts, and the YouTube/Instagram destinations.
- `data/radio.json` carries SHA-256 checksums for every download; re-check them if assets are replaced.
- The site sets no cookies and loads no analytics, so no consent banner is required. Adding analytics would change that.
