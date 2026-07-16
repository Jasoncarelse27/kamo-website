# Kamo G — Son of Moses Website

Official static website and artist platform for Kamo G's **Son of Moses** experience. The repository contains the public website only; the separate `/portal/kamo` client portal is not part of this codebase.

## Stack

- Static HTML5
- CSS
- Vanilla JavaScript
- JSON content files
- Chart.js loaded from a CDN for dashboard charts
- Netlify redirects for clean public routes

There is no package manifest, dependency installation step, compile step, or generated production build.

## Structure

```text
assets/images/   Artist, release, gallery, and brand imagery
components/      Shared navigation, sidebar, and footer fragments
css/             Global, dashboard, page, and responsive styles
data/            Artist, release, event, gallery, radio, and dashboard content
js/              Rendering, interaction, and utility JavaScript
pages/           Static page documents served through Netlify redirects
index.html       Homepage / artist dashboard
netlify.toml     Clean-route deployment configuration
```

## Local setup

No installation is required. For a production-like local preview, use an existing Netlify CLI installation from the repository root:

```sh
netlify dev
```

This is preferred because the site depends on the clean-route rewrites in `netlify.toml`. A basic static server can display the homepage, but it does not emulate `/music`, `/bookings`, `/media`, `/radio`, and `/about` without equivalent rewrite rules.

Useful source checks:

```sh
jq empty data/*.json
node --check js/main.js
node --check js/utils.js
git diff --check
```

## Deployment

- Hosting platform: Netlify
- Production branch: `main`
- Build command: none
- Publish directory: repository root (`.`)
- Repository-side deployment settings: `netlify.toml`
- Account-side ownership, domains, environment settings, and deploy history: Netlify dashboard

Do not deploy until the client-dependent items in `HANDOVER.md` are resolved and the production owner has approved the launch.
