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
| `/` | OXYGEN TANK campaign hero and compact Latest content |
| `/music` | Current release, one Spotify embed, and official artist link |
| `/bookings` | Direct booking email and concise enquiry guidance |
| `/media` | Approved photography and official media destinations |
| `/radio` | Native voice-note previews and verified public downloads |
| `/about` | Concise approved biography, current release, and official links |

## Content configuration

Frequently changed public content is centralized in:

- `data/artist.json` — public name, biography, contacts, social destinations, and images
- `data/releases.json` — positively verified releases only
- `data/gallery.json` — approved public photography only
- `data/radio.json` — physically available public downloads and factual metadata

The current booking journey is the confirmed `mailto:kgnon6@gmail.com` fallback. No scheduling link or form is exposed without a confirmed Kamo-owned public destination.

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

The public pack is under `assets/downloads/kamo-g-radio-pack/`. It contains the two supplied original press portraits, the approved clean and explicit radio voice notes in their original M4A format, and an integrity-tested ZIP containing all four files. The radio route uses native HTML audio controls with metadata-only preload; no audio was transcoded.

See `CLIENT_ASSET_MANIFEST.md`, `RADIO_PACK_MANIFEST.md`, and `HANDOVER.md` for checksums, conversion details, publication decisions, and remaining client inputs.

## Deployment boundary

- Hosting: Netlify
- Production branch: `main`
- Build command: none
- Publish directory: repository root (`.`)
- Feature delivery branch: `feature/kamo-client-ready-20260718`

Use the connected Git workflow for a Deploy Preview. Do not merge, promote to Production, alter DNS, or add a permanent canonical URL until ownership and the final public domain are confirmed.

Open Graph and Twitter images intentionally use root-relative approved assets for now. Convert them to absolute public URLs only after the final domain is approved; do not use a Deploy Preview hostname as the permanent value.
