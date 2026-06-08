# DB STUDIO ARTIST ECOSYSTEM PLATFORM — MASTER PROJECT BRIEF
# Version 1 · Kamo G (First Production Client)
# DB Studio · Strategy | Branding | Growth
# Read this file completely before any implementation.
# This document is the permanent source of truth for the project.

---

## PROJECT ROLE

You are the **Lead Frontend Engineer, UX Designer, and Technical Architect** for DB Studio.

You are building **Version 1 of the DB Studio Artist Ecosystem Platform** using **Kamo G** as the first production client.

This is **NOT** a simple artist website.

This is an **Artist Ecosystem Platform** — a premium, dark-luxury dashboard-style interface that serves as the artist's digital headquarters.

This platform must be **reusable** for future artists, musicians, DJs, speakers, influencers, and public personalities. Kamo G is the first deployment, not the last.

---

## BUSINESS OBJECTIVE

The platform is a **product for DB Studio**, not just a website for Kamo G.

If built correctly, DB Studio can clone it for:
- Musicians
- DJs
- Influencers
- Speakers
- Coaches

...and simply swap branding and content.

Kamo G is DB Studio's **first ecosystem client**, not their last website client.

### Key Principles

- **Fast deployment**
- **Easy maintenance**
- **Reusable architecture**
- **Low technical debt**
- **Low hosting costs**
- **High performance**
- **SEO readiness**
- **Visual impact first** — build the experience, fake the data where needed

---

## TECHNOLOGY RULES

### Mandatory

- **Bootstrap 5**
- **SCSS** (compiled to CSS)
- **HTML5**
- **Vanilla JavaScript**
- **Chart.js** (for analytics/dashboard charts)

### Forbidden

- ❌ Next.js
- ❌ React
- ❌ Vue
- ❌ Angular
- ❌ Supabase
- ❌ Firebase
- ❌ Authentication
- ❌ User accounts
- ❌ Databases
- ❌ Server-side rendering
- ❌ Webflow
- ❌ Any frontend framework beyond vanilla JS
- ❌ Any backend or database system
- ❌ Over-engineering

This is a **static website architecture** with JSON-driven content.

---

## DESIGN DIRECTION

### Approved Concept: Design Direction 03

The approved design is an **Artist Ecosystem Dashboard** — not a brochure website.

### Visual Style

- **Dark premium interface** — black `#111111` background
- **Gold accents** — `#c9972a` primary accent
- **Dashboard cards** — content organized in card grids
- **Artist profile** — prominent artist branding in sidebar/header
- **Ecosystem navigation** — full navigation across all platform sections
- **Analytics panels** — Chart.js powered metrics displays
- **Release showcase** — music release grid with streaming links

### Visual References

- Apple Music artist pages (dark, card-based)
- Spotify artist profiles (dark, data-rich)
- Def Jam artist websites (premium, cinematic)
- Sony Music artist websites (polished, professional)
- Dashboard UI patterns (cards, metrics, navigation)

### Avoid

- Generic templates
- Corporate layouts
- Agency-style websites
- Brochure/aesthetic-only sites
- Light mode / white backgrounds

### Focus On

- Cinematic imagery
- Strong typography
- Mobile-first UX
- Premium feel
- Dashboard-like information hierarchy
- Card-based content layout

---

## DESIGN SYSTEM

### Colours

| Token | Hex | Usage |
|---|---|---|
| Gold | `#c9972a` | Primary accent, buttons, highlights |
| Gold Light | `#e0b84a` | Hover states, secondary gold |
| Black | `#111111` | Page background |
| Dark | `#1a1a1a` | Card backgrounds, sections |
| Dark Mid | `#222222` | Elevated cards, hover states |
| White | `#ffffff` | Text, icons |
| Muted | `#888888` | Secondary text, labels |
| Border | `#333333` | Card borders, dividers |
| Success | `#10b981` | Positive metrics, active states |
| Warning | `#f59e0b` | Alert metrics, pending states |

### Typography

- **Heading font:** Montserrat — Google Fonts (weights: 400, 600, 700, 900)
- **Body font:** Inter — Google Fonts (weights: 400, 500, 600)
- H1: Montserrat 700, 48px desktop / 28px mobile
- H2: Montserrat 700, 32px desktop / 22px mobile
- H3: Montserrat 600, 20px
- Body: Inter 400, 15px, line-height 1.6
- Label/Tag: Montserrat 700, 10px, letter-spacing 2px, UPPERCASE
- Metric/Stat: Montserrat 700, 28px

### Spacing

| Token | Value |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 48px |
| xxl | 80px |

---

## WEBSITE STRUCTURE

### Sprint 1 — Visual Experience (Current Build)

Build the exact experience shown in the approved concept. Fake data where needed for launch.

| Page | Route | Description |
|---|---|---|
| Dashboard | `/` | Artist HQ — profile card, metrics, quick actions, recent releases, upcoming events |
| Music | `/music` | Full discography — filterable grid, streaming links, EP spotlight |
| Bookings | `/bookings` | Booking form (Typeform embed), availability, what to expect |
| Media | `/media` | Press photos (lightbox gallery), videos (YouTube embeds) |
| Radio Pack | `/radio` | EPK download, press kit, bio, audio downloads |
| About | `/about` | Artist bio, timeline, photos, social links |

### Sprint 2 — Revenue Streams (Future)

- Merch (product grid, cart, checkout)
- Fan Club (exclusive content, membership tiers)
- Partnerships (brand collaboration showcase)

### Sprint 3 — Advanced Features (Future)

- Real analytics
- Newsletter integration
- CRM integrations

---

## FOLDER STRUCTURE

```
kamo-website/
├── index.html                    # Dashboard (Home)
├── pages/
│   ├── music.html
│   ├── bookings.html
│   ├── media.html
│   ├── radio.html
│   └── about.html
├── components/
│   ├── navbar.html
│   ├── footer.html
│   ├── sidebar.html
│   ├── dashboard-card.html
│   ├── metric-card.html
│   ├── track-card.html
│   ├── section-header.html
│   └── streaming-links.html
├── scss/
│   ├── main.scss                 # Imports all partials
│   ├── _variables.scss           # Design tokens
│   ├── _reset.scss               # Base reset
│   ├── _typography.scss          # Font styles
│   ├── _layout.scss              # Grid, containers, spacing
│   ├── _components.scss          # Reusable component styles
│   ├── _dashboard.scss           # Dashboard-specific styles
│   ├── _music.scss               # Music page styles
│   ├── _dark.scss                # Dark theme overrides
│   └── _responsive.scss          # Breakpoint overrides
├── css/
│   └── main.css                  # Compiled SCSS output
├── js/
│   ├── main.js                   # App entry point
│   ├── components.js             # Component loader
│   ├── dashboard.js              # Dashboard charts (Chart.js)
│   ├── music.js                  # Music page filter + player
│   └── utils.js                  # Utility functions
├── data/
│   ├── artist.json               # Artist profile data
│   ├── releases.json             # Music discography
│   ├── dashboard.json            # Dashboard metrics + cards
│   ├── events.json               # Upcoming events
│   ├── gallery.json              # Press photos
│   └── radio.json                # Radio pack / EPK data
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── releases/
│   │   ├── gallery/
│   │   └── brand/
│   ├── fonts/
│   └── downloads/
├── lib/
│   ├── bootstrap.min.css
│   ├── bootstrap.bundle.min.js
│   ├── chart.min.js              # Chart.js CDN fallback
│   └── (other vendor libs)
└── KAMO_ARTIST_PLATFORM_MASTER.md
```

---

## COMPONENT ARCHITECTURE

### Reusable Components

| # | Component | Description |
|---|---|---|
| 1 | **Navbar** | Top navigation — logo, nav links, CTA button, mobile hamburger |
| 2 | **Sidebar** | Dashboard sidebar — artist avatar, quick stats, navigation |
| 3 | **Footer** | Brand info, social links, quick links, copyright, "Built by DB Studio" |
| 4 | **Dashboard Card** | Content card with icon, title, value, trend indicator |
| 5 | **Metric Card** | Analytics metric — label, number, chart sparkline, % change |
| 6 | **Track Card** | Music release — cover art, title, type badge, year, listen button |
| 7 | **Section Header** | Section title + optional "View all" link |
| 8 | **Streaming Links** | Platform buttons — Spotify, Apple Music, YouTube, SoundCloud |
| 9 | **EP Banner** | Countdown timer + EP info + pre-save CTA |
| 10 | **Booking Form** | Typeform embed container |

### Component Rules

- Each component is a standalone HTML snippet
- Components are loaded via JavaScript or assembled at build time
- No component depends on another component's internal structure
- CSS classes follow BEM-like naming: `.dashboard-card`, `.track-card`, `.metric-card`, `.btn-gold`
- All components must be responsive (mobile-first)

---

## JSON CONTENT SCHEMA

### `data/artist.json`

```json
{
  "name": "Kamo G",
  "tagline": "South African music artist",
  "bio": "Born in Pretoria. Bred in Kempton Park. A voice for a generation that refuses to be ignored.",
  "email": "kgnon6@gmail.com",
  "location": "Johannesburg, South Africa",
  "genre": "Hip Hop / Afro",
  "avatar": "assets/images/brand/avatar.jpg",
  "coverImage": "assets/images/brand/cover.jpg",
  "socials": {
    "instagram": "https://instagram.com/kamog",
    "twitter": "https://twitter.com/kamog",
    "youtube": "https://youtube.com/@kamog",
    "spotify": "https://open.spotify.com/artist/...",
    "appleMusic": "https://music.apple.com/artist/...",
    "soundcloud": "https://soundcloud.com/kamog"
  },
  "stats": {
    "monthlyListeners": 12450,
    "totalStreams": 892000,
    "followers": 8450,
    "releases": 12
  }
}
```

### `data/releases.json`

```json
[
  {
    "id": "rel-001",
    "title": "Son of Moses",
    "coverArt": "assets/images/releases/son-of-moses.jpg",
    "type": "single",
    "year": "2026",
    "releaseDate": "2026-03-15",
    "spotifyUrl": "https://open.spotify.com/track/...",
    "appleMusicUrl": "https://music.apple.com/...",
    "youtubeUrl": "https://youtube.com/watch?v=...",
    "soundcloudUrl": "https://soundcloud.com/...",
    "isFeatured": true,
    "streamCount": 245000,
    "description": "Description of the release..."
  }
]
```

### `data/dashboard.json`

```json
{
  "metrics": [
    {
      "id": "metric-1",
      "label": "Monthly Listeners",
      "value": 12450,
      "prefix": "",
      "suffix": "",
      "change": 12.5,
      "changeDirection": "up",
      "icon": "headphones",
      "chartData": [3200, 4800, 6200, 7800, 9100, 10400, 12450]
    },
    {
      "id": "metric-2",
      "label": "Total Streams",
      "value": 892000,
      "prefix": "",
      "suffix": "",
      "change": 8.3,
      "changeDirection": "up",
      "icon": "music",
      "chartData": [450000, 520000, 610000, 680000, 740000, 810000, 892000]
    }
  ],
  "quickActions": [
    { "label": "Latest Release", "value": "Son of Moses", "link": "/music" },
    { "label": "Upcoming Show", "value": "Johannesburg — Aug 15", "link": "/bookings" },
    { "label": "New EPK", "value": "Radio Pack v3", "link": "/radio" }
  ],
  "recentActivity": [
    { "type": "release", "text": "New single 'Son of Moses' released", "date": "2026-03-15" },
    { "type": "stream", "text": "Surpassed 800,000 total streams", "date": "2026-03-10" }
  ]
}
```

### `data/events.json`

```json
[
  {
    "id": "evt-001",
    "title": "Event Name",
    "date": "2026-08-15",
    "venue": "Venue Name",
    "city": "Johannesburg",
    "ticketUrl": "https://tickets.example.com",
    "isActive": true,
    "isPast": false
  }
]
```

### `data/gallery.json`

```json
[
  {
    "id": "gallery-001",
    "src": "assets/images/gallery/photo-1.jpg",
    "alt": "Kamo G — performance",
    "caption": "Live at Venue, Johannesburg 2026",
    "category": "performance"
  }
]
```

### `data/radio.json`

```json
{
  "isActive": true,
  "title": "Kamo G — Radio Pack 2026",
  "description": "Official press kit, bio, audio downloads, and media assets.",
  "epkDownloadUrl": "https://drive.google.com/...",
  "bioPdfUrl": "https://drive.google.com/...",
  "audioDownloadUrl": "https://drive.google.com/...",
  "contents": [
    "Artist Biography (PDF)",
    "High Resolution Photos (ZIP)",
    "Radio Edit Tracks (WAV)",
    "Clean Edit Tracks (WAV)",
    "Interview Questions (PDF)",
    "Live Performance Rider (PDF)"
  ],
  "lastUpdated": "2026-03-01"
}
```

---

## DEPLOYMENT STRATEGY

### Hosting Options

| Provider | Cost | Features |
|---|---|---|
| **GitHub Pages** | Free | CDN, custom domain, auto-deploy from `main` |
| **Netlify** | Free tier | CDN, form handling, deploy previews, custom domain |
| **Cloudflare Pages** | Free | Global CDN, HTTP/3, DDoS protection |

### Recommended: Netlify

- Free tier supports everything needed
- One-click deploy from GitHub
- Built-in form handling (no backend needed)
- Deploy previews for testing
- Custom domain with automatic HTTPS

### Deployment Flow

1. Push to `main` branch on GitHub
2. Netlify auto-detects and deploys
3. Custom domain: `kamog.co.za`
4. Automatic HTTPS via Let's Encrypt

### Why Static Hosting

- Zero server costs
- Global CDN distribution
- Instant page loads
- No security patches needed
- No database to maintain
- Easy to clone for future artists

---

## GIT WORKFLOW

### Branch Strategy

- `main` — Production-ready code (auto-deploys to Netlify)
- `develop` — Integration branch for features
- `feature/*` — Individual feature branches (e.g., `feature/dashboard`, `feature/music-page`)

### Commit Convention

```
type(scope): description

Types: feat, fix, refactor, style, docs, chore
Scope: component name or page (e.g., dashboard, music, navbar)
```

### Checkpoint Rules

- Create a Git commit before any major change
- Create a Git commit after any successful validation
- Never force push to `main`
- Tag releases: `v1.0.0`, `v1.1.0`, etc.

---

## SPRINT 1 — BUILD ORDER

### Step 1: Project Scaffold
- [ ] Initialize Git with `main` branch
- [ ] Create folder structure
- [ ] Create `.gitignore`
- [ ] Set up SCSS compilation (or use pre-compiled Bootstrap CDN for v1)
- [ ] Git checkpoint

### Step 2: Design System + Base Styles
- [ ] Create `_variables.scss` with all design tokens
- [ ] Create `_reset.scss`, `_typography.scss`, `_layout.scss`
- [ ] Create `_dark.scss` with dark theme
- [ ] Create `_responsive.scss` with breakpoints
- [ ] Compile to `css/main.css`
- [ ] Git checkpoint

### Step 3: JSON Data Files
- [ ] Create all JSON files with demo data
- [ ] Git checkpoint

### Step 4: Core Components
- [ ] Navbar (responsive, dark, gold accents)
- [ ] Sidebar (dashboard-style, artist profile)
- [ ] Footer
- [ ] Dashboard Card component
- [ ] Metric Card component
- [ ] Track Card component
- [ ] Section Header component
- [ ] Streaming Links component
- [ ] Git checkpoint

### Step 5: Dashboard Page (`index.html`)
- [ ] Artist profile header
- [ ] Metrics row (4 cards with Chart.js sparklines)
- [ ] Quick actions section
- [ ] Recent releases grid
- [ ] Recent activity feed
- [ ] Git checkpoint

### Step 6: Music Page (`/music`)
- [ ] Filter tabs (All, Singles, Albums, EPs, Features)
- [ ] Release grid with Track Cards
- [ ] EP spotlight section
- [ ] Git checkpoint

### Step 7: Bookings Page (`/bookings`)
- [ ] Booking form (Typeform embed placeholder)
- [ ] What to expect section
- [ ] Availability info
- [ ] Git checkpoint

### Step 8: Media Page (`/media`)
- [ ] Press photo gallery (lightbox)
- [ ] Video section (YouTube embeds)
- [ ] Git checkpoint

### Step 9: Radio Pack Page (`/radio`)
- [ ] EPK download section
- [ ] Contents list
- [ ] Download buttons
- [ ] Git checkpoint

### Step 10: About Page (`/about`)
- [ ] Artist bio
- [ ] Timeline
- [ ] Social links
- [ ] Git checkpoint

### Step 11: Validation
- [ ] Test all pages in browser
- [ ] Test mobile responsiveness
- [ ] Test all links and navigation
- [ ] Validate HTML
- [ ] Git checkpoint

---

## DEVELOPMENT RULES

### Always

1. Plan before building
2. Explain changes before execution
3. Create Git checkpoints
4. Build incrementally
5. Validate before continuing
6. Mobile-first responsive design
7. Accessible HTML (semantic elements, ARIA labels, skip links)
8. Use JSON data files — never hardcode artist content
9. Build the visual experience first — fake data is acceptable for launch

### Never

- Delete files automatically
- Refactor approved code without permission
- Change architecture without approval
- Introduce dependencies unnecessarily
- Hardcode artist content in templates
- Access files outside the `kamo-website` workspace
- Build backend, database, or authentication systems
- Use React, Next.js, Vue, Angular, or any JS framework

---

## SAFETY RULES (MANDATORY)

- Read-only outside the current workspace
- Never access parent directories
- Never access any existing project folders (e.g., `db-assistant-os`, `db-assistant-pwa`)
- Never modify files outside the current workspace
- Never delete files automatically
- Always ask before destructive actions
- Prefer small, verifiable steps
- Create Git checkpoints before major changes

---

## FIRST TASK INSTRUCTION

When implementation begins:

1. **Do not build pages yet.**
2. Read this entire document again.
3. Design the architecture.
4. Design the folder structure.
5. Design the content model.
6. Design the component system.
7. Present the plan for approval.
8. Wait for approval before implementation.

---

*DB Studio — Strategy · Branding · Growth*
*Built for Kamo G. Owned by Kamo G. Grown by DB Studio.*
*This is an Artist Ecosystem Platform — the first of many.*
