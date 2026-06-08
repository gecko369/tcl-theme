# The Celebration Life — BD Theme
> Claude Code reads this file at the start of every session. It is the single source of truth. Do not add correction notes or changelogs — only final decisions live here. Update the phase checklist as work completes.

---

## Project Identity

**Site**: The Celebration Life
**Site tagline (CONFIRMED FINAL)**: "It's Always Sunny in Celebration."
**URL**: https://www.livethecelebrationlife.com
**Platform**: Brilliant Directories (PHP + Bootstrap, proprietary CMS)
**GitHub**: gecko369 — repo: github.com/gecko369/tcl-theme
**CSS delivery**: https://gecko369.github.io/tcl-theme/style.css
**JS delivery**: https://gecko369.github.io/tcl-theme/animations.js
**Owner**: Brad, Celebration FL, solo operator

---

## Repo Structure

```
tcl-theme/
├── CLAUDE.md
├── style.css                  <- Master stylesheet, served via GitHub Pages to BD
├── animations.js              <- Scroll animations, parallax, Swiper, Sunni UI
├── assets/
│   ├── logo-horizontal.svg    <- Header logo (use this in header widget)
│   ├── logo-stacked.svg       <- Stacked logo / favicon use
│   └── sunni-icon.svg         <- Favicon_72x72.svg renamed — used for loader, Sunni button, image mask
├── preview/
│   ├── index.html             <- Homepage mock
│   ├── events.html
│   ├── member-profile.html
│   ├── blog.html
│   ├── hub.html               <- App quick-find dashboard
│   └── sidebar-test.html
├── widgets/
│   ├── header.html
│   ├── footer.html
│   ├── events-widget.html
│   ├── blog-widget.html
│   ├── members-widget.html
│   └── deals-widget.html
└── docs/
    └── bd-deployment.md
```

---

## BD HEAD Injection (paste once into BD Settings → Design Settings → Additional HEAD Code)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&family=Figtree:wght@400;500;600&family=Caveat:wght@500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://gecko369.github.io/tcl-theme/style.css">
<script defer src="https://gecko369.github.io/tcl-theme/animations.js"></script>
```

---

## BD Platform Rules

1. NEVER edit a default widget directly. Clone first (Actions → Customize). Clones are yours, defaults auto-update from BD central.
2. NEVER disable Default CSS Stylesheets sitewide. BD Bootstrap CSS handles dropdowns, modals, forms, pagination, dashboards. The per-page "Disable Default CSS" checkbox may be used ONLY on fully custom pages where we supply 100% of the CSS.
3. Page-Level CSS field: raw CSS only, no style tags. HEAD field: raw code only, no head tags.
4. Widget HTML tab accepts full PHP. Edit HTML structure AROUND the PHP logic. Never remove PHP blocks — they query the database.
5. Shortcode format: [widget=Widget Name] or [form=form_name]
6. Template variables: %%FIELD_NAME%% (e.g. %%Profession%%, %%City%%)
7. Sidebars only display when Page Type = Single Web Page AND Full Screen Page is unchecked.
8. BD Banner Ad and Announcement containers must remain functional. Never hide them in global CSS.

---

## Brand Colors

```css
:root {
  /* Official brand hex values from logo SVG/PDF */
  --brand-teal:        #15C4AF;
  --brand-yellow:      #FFCA08;
  --brand-orange:      #F58220;
  --brand-sky:         #8CD1ED;
  --brand-blue:        #27AAE1;
  --brand-dark:        #231F20;

  /* Site backgrounds */
  --color-bg:          #FFFFFF;   /* Pure white — primary, most sections */
  --color-bg-warm:     #F9E0BB;   /* Warm sunny sand — alternate sections (Kissimmee-style) */
  --color-bg-teal:     #15C4AF;   /* Bold teal — feature sections, used confidently */
  --color-bg-sky:      #8CD1ED;   /* Sky blue — lighter feature sections */
  --color-bg-dark:     #0D3347;   /* Deep navy — footer, dark CTAs, loader background */

  /* Text */
  --color-text:        #2C3E50;
  --color-text-dark:   #1A2E3B;
  --color-text-light:  #5A7A8A;
  --color-text-white:  #FFFFFF;

  /* Actions */
  --color-action:      #F58220;   /* Orange — buttons, CTAs */
  --color-action-alt:  #15C4AF;   /* Teal — secondary actions */
  --color-link:        #27AAE1;   /* Medium blue — links */

  /* Sunni */
  --color-sunni:       #F58220;
}
```

---

## Contrast Rules (Non-Negotiable)

Light backgrounds need dark text. Dark backgrounds need white text. No exceptions.

| Background | Text | Notes |
|---|---|---|
| #FFFFFF white | #1A2E3B | Primary body areas |
| #F9E0BB warm sand | #1A2E3B | Alternate sections |
| #8CD1ED sky blue | #1A2E3B | NEVER white text on sky blue |
| #15C4AF teal | #1A2E3B preferred | White only for large/bold text |
| #F58220 orange | #FFFFFF | Buttons/large text OK; #1A2E3B better for body |
| #FFCA08 yellow | #1A2E3B | ALWAYS dark text, never white |
| #0D3347 navy | #FFFFFF | Footer and dark sections |

Sky blue (#8CD1ED) at full saturation must NOT fill large background areas — visually tiring.
Use #F9E0BB warm sand as the alternate section background, not sky blue fills.
Use sky blue for accents, borders, icons, small elements.

---

## Typography

DO NOT USE: Inter, Roboto, DM Sans, Space Grotesk, Playfair Display, Cormorant Garamond, Bricolage Grotesque, Nunito, Baloo 2, or any other overused AI-default font.

| Role | Font | Weight | Notes |
|---|---|---|---|
| Hero / Display H1 | Kaushan Script | 400 | Flowing script — warm, celebratory energy |
| Section H2 | Calistoga | 400 | Bold slab-adjacent, friendly and distinctive |
| Subheadings H3–H6 | Calistoga | 400 | |
| Body text | Figtree | 400/500 | Warm geometric sans, excellent readability |
| Captions / labels | Figtree | 400 | |
| Decorative accent | Caveat | 600 | SHORT text only — taglines, pull quotes, Ask Sunni annotation |

Font sizes — mobile first, large and bold:
- H1: clamp(2.8rem, 6vw, 5.5rem)
- H2: clamp(2rem, 4vw, 3.5rem)
- H3: clamp(1.4rem, 2.5vw, 2rem)
- Body: 1.0625rem (17px) / line-height 1.7

---

## Visual Aesthetic

Vibe: Southern Florida lifestyle. Spanish moss, glass-bottom springs, lake paddle boats, neighbors who know each other. Fun, warm, joyful. NOT fancy, NOT editorial, NOT British tea room.

Reference sites:
- The Palm Beaches (thepalmbeaches.com) — closest match. Botanical overlays, bold color blocks, tropical illustrated elements at section transitions.
- Experience Kissimmee — warm sandy backgrounds, bold rounded type, marquee ticker band, circular crops.
- Margaritaville Orlando — photo-forward, bold teal/navy sections.

Key design elements:
1. BOTANICAL SVG OVERLAYS — palm fronds, tropical leaves, hibiscus-adjacent shapes at section edges. Used like The Palm Beaches site. Illustrated, layered, tropical.
2. MARQUEE TICKER BAND — scrolling text between major sections. Content: "EVENTS · LOCAL BUSINESSES · DEALS · COMMUNITY · ALWAYS SOMETHING TO CELEBRATE · ". Bold Nunito uppercase, navy or teal background, white text.
3. SUN-SHAPE IMAGE CROPS — see below.
4. BOLD COLOR SECTIONS — full teal, full warm sand, full white used confidently. Not subtle.
5. SECTION BREAKS — SVG wave dividers + botanical overlays. Never hard lines.
6. CIRCULAR/ORGANIC image treatments for certain content (not all images).

DO NOT USE: glassmorphism, dark purple gradients, card boxes for non-data content, italic serif headlines, cream (#FAFAxx) backgrounds.

---

## Sun Shape Image Crop

The COMPLETE logo silhouette (orange rays + teal palm fronds + inner scene) used as image mask.
Pixel-perfect to the brand mark. Palm fronds at the top are included.

Use mask-image NOT clip-path polygon (polygon is a rough approximation that doesn't match the logo):

```css
.tcl-sun-crop {
  -webkit-mask-image: url('/assets/sunni-icon.svg');
  mask-image: url('/assets/sunni-icon.svg');
  mask-size: cover;
  mask-repeat: no-repeat;
  mask-position: center;
  object-fit: cover;
  display: block;
}

.tcl-sun-crop-wrap {
  -webkit-mask-image: url('/assets/sunni-icon.svg');
  mask-image: url('/assets/sunni-icon.svg');
  mask-size: cover;
  mask-repeat: no-repeat;
  mask-position: center;
  overflow: hidden;
}
```

Sizes: Large feature 180–240px / Medium grid 110–140px / Small tiles 80–110px

Use sun crop for: homepage feature callouts, blog thumbnails in grids, event feature images, hub tiles, community spotlights.
Keep rectangular: hero banners, business listing covers, in-article photos, member profile banners.

---

## Spacing

```css
:root {
  --space-xs:   0.5rem;
  --space-sm:   1rem;
  --space-md:   1.5rem;
  --space-lg:   2.5rem;
  --space-xl:   4rem;
  --space-2xl:  6rem;
  --space-3xl:  10rem;
}
```

---

## Navigation (Final)

```
Home
Business Directory ↓
    Browse Categories
    View All Businesses
    ──────────────────
    Add Your Business         [orange text — visually distinct CTA]
Food & Dining
Home Service Businesses
Events & Shows
Local Deals
News & Blog
Real Estate ↓
    Search Celebration Homes  [opens new tab — external IDX site]
    What's My Home Worth?     [opens new tab — external valuation tool]
[Get Featured ↓]              [far right — orange pill outline button]
    List Your Business
    Featured Placement
    Banner Advertising
    Sponsorships & Packages
```

Mobile: hamburger menu accordion. Get Featured drops to bottom with separator, renders full-width orange button.

---

## Hamburger Icon (Ocean Swell — Final)

Color: Teal #15C4AF
Style: Three SVG wave paths with asymmetric/irregular wave shape
Closed: Still waves
Open: Waves flow continuously left — NO X, NO rotation
Animation: translateX(-33px) linear infinite, 1.4s
Stagger: 0s / 0.15s / 0.30s per wave line
Hover: background rgba(21,196,175,0.12), border-radius 10px

SVG paths (viewBox="0 0 34 24", overflow:hidden):
Top:    M-66,5  Q-56,0  -44,5  Q-38,8  -33,5  Q-23,0  -11,5  Q-5,8  0,5  Q10,0  22,5  Q28,8  33,5  Q43,0  55,5  Q61,8  66,5
Middle: M-66,12 Q-56,7  -44,12 Q-38,15 -33,12 Q-23,7  -11,12 Q-5,15 0,12 Q10,7  22,12 Q28,15 33,12 Q43,7  55,12 Q61,15 66,12
Bottom: M-66,19 Q-56,14 -44,19 Q-38,22 -33,19 Q-23,14 -11,19 Q-5,22 0,19 Q10,14 22,19 Q28,22 33,19 Q43,14 55,19 Q61,22 66,19

```css
@keyframes oceanFlow { from{transform:translateX(0)} to{transform:translateX(-33px)} }
.tcl-nav-wave.flowing { animation: oceanFlow 1.4s linear infinite; }
```

---

## Page Loader

Background: Deep navy #0D3347
Icon: sunni-icon.svg centered at 100x100px
Glow: filter: drop-shadow(0 0 12px rgba(245,130,32,0.5))
Animation: Outer rays rotate, inner palm tree scene stays still
Speed: 5s linear infinite
Fade out: opacity + visibility transition 0.7s when window 'load' fires
Placement: First element in header widget body, position: fixed, inset: 0, z-index: 9999

```css
#tcl-loader { position:fixed; inset:0; background:#0D3347; display:flex; align-items:center; justify-content:center; z-index:9999; transition:opacity 0.7s ease,visibility 0.7s ease; }
#tcl-loader.done { opacity:0; visibility:hidden; pointer-events:none; }
.tcl-loader-rays { transform-origin:50px 50px; transform-box:view-box; animation:tclSpin var(--ray-speed,5s) linear infinite; }
@keyframes tclSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
```

```javascript
window.addEventListener('load',()=>{ document.getElementById('tcl-loader')?.classList.add('done'); });
```

---

## Sunni — AI Assistant

**Name**: Sunni
**Taglines**: "Ask Sunni — it's always sunny in Celebration." / "She knows where the sunshine is."
**Voice output**: ElevenLabs (Brad has existing Geckonaut account) — warm, friendly Florida voice
**Voice input**: Web Speech API — free, built into Chrome/Safari, transcribes to text
**Button**: position fixed, bottom: 20px, right: 20px, z-index: 9998, 52x52px, uses sunni-icon.svg
**Idle**: rays spin at 5s (same .tcl-loader-rays class)
**Speaking**: rays speed to 0.7s + pulse ring radiates outward (border 2px solid #F58220, animation pulseRing 1s ease-out infinite)
**"Ask Sunni!" annotation**: Caveat 600 20px orange, shows first visit only (localStorage flag), curved arrow pointing right toward button, gentle bob animation (translateY 0 to -6px, 2.2s), disappears after 5s or first tap

Architecture:
  User taps Sunni button
  → slide-up panel: text input + mic button
  → Web Speech API transcribes voice to text
  → query + live BD data (events, coupons, hours) → Cloudflare Worker (free tier)
  → Cloudflare Worker → Claude Haiku API (~$0.0002/query)
  → response text → ElevenLabs TTS → audio plays + text shown

Build in Phase 9 after site design is solid.

---

## App Strategy

Type: PWA (Progressive Web App) — installed via "Add to Home Screen"
App store wrapper: Median.co (~$99/yr iOS + Android) after site is solid
Start URL: /hub (quick-find card dashboard page)

Registration gate — app mode only, NOT on regular website:
```javascript
const isApp = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
if (isApp && !localStorage.getItem('tcl_registered')) {
  showRegistrationOverlay(); // name + email
  // on submit: n8n webhook → GHL contact, set localStorage flag
}
```

---

## Active Content Types

| Type | Status |
|---|---|
| Events | Active |
| Blog Articles | Active |
| Business / Nonprofit / Org / Club Listings | Planned |
| Deals / Coupons | Planned (no content yet) |
| Community Articles (member-written) | Planned |
| Regular user members (non-listing) | NOT used |
| Jobs / Properties / Classifieds | NOT used |

---

## Key Pages

| Page | Approach |
|---|---|
| Homepage | Full custom — hero, sections, widget placements |
| Pricing / Membership | Custom — pricing table, CTAs |
| App Hub (/hub) | Card grid, full-width, no sidebar, PWA start URL |
| Events listing | BD SEO template + restyled widget |
| Event detail | BD SEO template |
| Blog listing | BD SEO template + restyled widget |
| Blog post | BD SEO template |
| Member profile | Cloned widget — full reskin |
| Business search results | BD SEO template reskin |
| About / Contact | Global CSS handles most |

---

## Widget HTML Structures

Paste inspected HTML here once Brad right-clicks elements on the live site:

### Events Widget Card
```html
<!-- right-click event card on live site → Inspect → copy outermost div -->
```

### Member Listing Card
```html
<!-- right-click member card → Inspect → copy outermost div -->
```

### Blog Article Card
```html
<!-- right-click blog card → Inspect → copy outermost div -->
```

---

## Micro-detail Styles (apply in style.css)

- Hamburger: ocean swell waves (see above)
- Dropdown chevrons: thin teal SVG, rotates 180° on open
- Form focus ring: box-shadow 0 0 0 3px rgba(21,196,175,0.25)
- Scroll-to-top button: sunni-icon.svg at 32px, fades in after 400px scroll
- Pagination: teal dots, active dot slightly larger with soft pulse
- Image loading skeleton: animated shimmer in sky blue palette
- Breadcrumb separator: tilde ~ instead of / or >
- External link icon: small blue arrow-out on Real Estate nav links
- Blockquotes: left border orange, Caveat font for quote text

---

## Phase Checklist

- [ ] Phase 0  — Repo created, GitHub Pages live, BD HEAD code injected, assets in /assets/, widget HTML inspected
- [x] Phase 1  — style.css foundation: CSS vars, typography, buttons, wave keyframes, ocean hamburger keyframes, sun crop mask, loader keyframes
- [ ] Phase 2  — Header widget: cloned, restyled, ocean wave hamburger, mobile nav working
- [ ] Phase 3  — Footer widget: cloned, restyled, botanical wave decoration
- [ ] Phase 4  — Homepage built
- [ ] Phase 5a — Events widget restyled
- [ ] Phase 5b — Blog widget restyled
- [ ] Phase 5c — Member listing card restyled
- [ ] Phase 5d — Deals widget restyled
- [ ] Phase 5e — Sidebar mobile image fix
- [ ] Phase 6  — Member profile page reskin
- [ ] Phase 7  — BD SEO templates
- [ ] Phase 8  — Static pages: About, Contact, Pricing, App Hub (/hub)
- [ ] Phase 9  — Swiper.js sliders + Sunni (Cloudflare Worker, ElevenLabs, floating button)
- [ ] Phase 10 — Cross-device testing, PWA manifest, schema markup audit, polish

---

## Session Rules

Start: State phase and task clearly.
End: git add . && git commit -m "description" && git push
Preview: npx serve . → http://localhost:3000/preview/index.html
Deploy widget changes: paste HTML from /widgets/ into BD Widget Manager (cloned widget only)

NEVER: add !important everywhere, override BD Bootstrap grid globally, remove PHP from widgets, use inline styles, skip mobile testing, edit default widgets, disable CSS sitewide.
