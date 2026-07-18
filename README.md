# Kamo. G — Official Artist Website

A fast, static public website for South African artist **Kamo. G**, covering verified music, approved photography, booking enquiries, and public radio/press downloads.

## Architecture

- Static HTML5, CSS, and vanilla JavaScript
- JSON content in `data/`
- Shared HTML fragments in `components/`
- Netlify clean-route rewrites in `netlify.toml`
- No package install, build step, framework, CMS, API, database, tracking, or analytics

## Public routes

| Route | Purpose |
|---|---|
| `/` | Artist HQ and official destinations |
| `/music` | Verified featured release and Spotify catalogue link |
| `/bookings` | Booking enquiry journey and email fallback |
| `/media` | Approved photography and official media destinations |
| `/radio` | Verified public press and radio-pack downloads |
| `/about` | Approved biography and Son of Moses narrative |

## Content configuration

Frequently changed public content is centralized in:

- `data/artist.json` — public name, biography, contacts, social destinations, images, and optional Cal.com URL
- `data/releases.json` — positively verified releases only
- `data/gallery.json` — approved public photography only
- `data/radio.json` — physically available public downloads and factual metadata

`calComUrl` is deliberately empty until Kamo supplies a confirmed Kamo-owned public event URL. When configured, it enables an external booking-calendar link; no inline embed is implemented. The current functional fallback is `mailto:kgnon6@gmail.com`. No personal, studio-administration, DB Reply, or fabricated Cal.com URL is present.

## Local preview

No installation is required. From the repository root, use an existing Netlify CLI installation so the clean routes behave like the hosted site:

```sh
netlify dev --offline --dir . --port 8888 --no-open --skip-gitignore
```

Useful source checks:

```sh
jq empty data/*.json
node --check js/main.js
node --check js/utils.js
git diff --check
```

## Downloads

The public pack is under `assets/downloads/kamo-g-radio-pack/`. It currently contains the two supplied original press portraits and an integrity-tested ZIP. Supplied audio is not published because its titles, ownership, and clean/broadcast status are not documented.

See `CLIENT_ASSET_MANIFEST.md`, `RADIO_PACK_MANIFEST.md`, and `HANDOVER.md` for checksums, conversion details, withheld assets, and remaining client decisions.

## Deployment boundary

- Hosting: Netlify
- Production branch: `main`
- Build command: none
- Publish directory: repository root (`.`)
- Feature delivery branch: `feature/kamo-client-ready-20260718`

Use the connected Git workflow for a Deploy Preview. Do not merge, promote to Production, alter DNS, or add a permanent canonical URL until ownership and the final public domain are confirmed.

Open Graph and Twitter images intentionally use root-relative approved assets for now. Convert them to absolute public URLs only after the final domain is approved; do not use a Deploy Preview hostname as the permanent value.
