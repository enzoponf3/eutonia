# Animations for Eutonia page (id: 17) — COMPLETED

**Date**: Thu Nov 19 2026

## What was implemented:

### Hero Section
- `animate-hero` class on hero image for fade-in animation
- `animate-hero-delay-1` on eyebrow text (0.2s delay)
- `animate-hero-delay-2` on intro paragraph (0.45s delay)
- All use the existing `heroFadeIn` keyframe (1s ease-out)

### Content Sections (Statement, Alternating Sections, Principles, CTA)
- Each section wrapped with `.reveal-anim` class for scroll-triggered animation
- All content elements inside use `.reveal-content` class:
  - Images with initial `opacity: 0`
  - Text blocks (organic fonts, headings, paragraphs)
  - Buttons and links
- Content fades in with 24px translate-up using `revealFadeIn` keyframe

### IntersectionObserver Pattern
- Script observes all `.reveal-anim` sections
- When a section enters viewport (threshold: 0.2):
  - Adds `.visible` class to trigger CSS animation
  - Unobserves after animating to avoid re-triggering
- Respects `prefers-reduced-motion` media query

### CSS Implementation (global.css)
- Added `@keyframes revealFadeIn`: fades from 0 opacity with 24px translate-y
- `.reveal-anim` sections: hidden (opacity: 0) when JS present, visible by default
- `.reveal-content`: starts at opacity: 0 with translateY(12px)
- Both animate to their final state when `.visible` is added
- Added prefers-reduced-motion fallback removing all animations

### Tests Added
- `tests/layout.test.ts`: "adds reveal animations to the Eutonia page"
- "uses IntersectionObserver for reveal animations on the Eutonia page"
- Verifies CSS keyframes and animation properties exist

## Verification Results:
```
npm test    : 94 tests passed
npm run check: 0 errors, 0 warnings  
npm run build: 3 pages built successfully (index, eutonia, sobre-mi)
```

The animations match the mindful, organic vibe of the page and maintain consistency with other animated sections (Hero, Gerda).

# Review section carousel (id: 18) - COMPLETED

**Date**: Thu Nov 19 2026

## What was implemented:
- Replaced the static 3-card grid in src/components/Reviews.astro with a carousel.
- Reviews are repeated three times (COPIES = 3) so the track loops in both directions.
- Active review is 60% wide and scaled to 1.10; neighbours sit at scale 0.92 with reduced opacity.
- The viewport uses a horizontal mask-image so both side reviews fade toward the edges.
- Previous/next arrow buttons under the track; the next arrow uses the accent background.
- No autoplay: movement only happens on arrow clicks, then the index is silently renormalised.
- Cards centre their content: stars on top, quote in the middle, avatar icon next to the name.
- prefers-reduced-motion disables the slide transitions.
- Updated tests/layout.test.ts with carousel, arrow, ordering and styling assertions.

## Verification Results:
```
./init.sh (Git Bash): all checks passed
npm test            : 99 tests passed
npm run check       : 0 errors, 0 warnings, 0 hints
npm run build       : 3 pages built (index, eutonia, sobre-mi)
```

(End of log)

## Follow-up fix (same feature)
- Cards now size to their own content (`align-items: center` instead of `stretch`; removed `h-full`).
- Fixed the double scale animation when the carousel closes a full round: the silent
  re-normalisation now adds `is-resetting` (which disables track and slide transitions)
  and removes it on the next animation frame.
- Verification: 101 tests passed, 0 check errors, 3 pages built, `./init.sh` exit 0.

# Sync tests with updated site data (maintenance)

**Date**: Tue Nov 24 2026

## What changed:
- `src/lib/site.ts` (user edit): plans now carry real booking links.
  - `Presencial` and `Online` point to the Google Forms reservation URL.
  - `Tratamiento` description mentions integrative kinesiology, chronic pain
    and the San Isidro office.
  - `Tratamiento` booking goes to the WhatsApp chat.
- `tests/site.test.ts`: added a `PLANS` suite covering plan order, headings,
  the updated treatment description, the form URL for group plans, the
  WhatsApp link for the treatment, the action label and the frequencies.

## Observation (not changed):
- `src/components/Plans.astro` still renders every card button with
  `href={PLANS.reservarHref}` (`#reservar`), so `link.enlace` is not used yet.
  The data tests pin the URLs, but the UI does not consume them.

## Verification Results:
```
./init.sh (with a node shim in WSL) : all checks passed
vitest                              : 108 tests passed
npm run check                       : 0 errors, 0 warnings, 0 hints
npm run build                       : 3 pages built
```

# Instagram link (id: 19) — COMPLETED

**Date**: Tue Nov 24 2026

## What was implemented:
- `src/lib/site.ts`: added `CONTACT.instagram_url`, pointing at
  `https://www.instagram.com/eutoniaymeditacion/`.
- `src/components/Footer.astro`: new footer with the brand name, site
  description, a WhatsApp button and, to its right, an Instagram button.
  - WhatsApp: `bg-white text-primary` with its icon.
  - Instagram: `bg-primary text-white` (inverted) with its icon.
  - Both open in a new tab with `noopener noreferrer`, have hover, active and
    visible focus states, and respect `prefers-reduced-motion`.
- `src/layouts/Layout.astro`: mounts `<Footer />` after `<main>` so every page
  gets it.
- Tests:
  - `tests/site.test.ts`: asserts the Instagram profile URL.
  - `tests/layout.test.ts`: footer mounted in the layout, WhatsApp and
    Instagram links, button order, inverted colors and icons.

## Acceptance:
- Footer Instagram button: yes.
- To the right of WhatsApp: DOM and flex order, verified in the built HTML.
- Inverted colors: white/primary vs primary/white.
- Corresponding icon: Instagram outline glyph, `aria-hidden`.
- Link: exact profile URL.

## Verification Results:
```
./init.sh (with a node shim in WSL) : all checks passed
vitest                              : 114 tests passed
npm run check                       : 0 errors, 0 warnings, 0 hints
npm run build                       : 3 pages built (footer on all 3)
```

## Follow-up revision (same feature):
- Removed `src/components/Footer.astro`. The footer is now the existing
  `Contact` component.
- `src/layouts/Layout.astro` imports and mounts `<Contact />` after `<main>`,
  so every page shares it as the footer landmark.
- `src/pages/index.astro` no longer imports or renders `<Contact />`; no other
  page rendered it.
- `src/components/Contact.astro` changed its root from `<section id="contacto">`
  to `<footer id="contacto">` and now holds both actions side by side:
  - WhatsApp: `bg-white text-primary`, to the left.
  - Instagram: `bg-primary text-white` (inverted) plus a white ring for edge
    separation, to the right.
- Tests updated: footer mounting from the layout, no duplicate in the index
  page, no standalone footer file, footer landmark, and Instagram position,
  inverted colors, icon and new tab behaviour.
- The built HTML has exactly one footer per page with WhatsApp before Instagram.

## Verification Results:
```
./init.sh (with a node shim in WSL) : all checks passed
vitest                              : 116 tests passed
npm run check                       : 0 errors, 0 warnings, 0 hints
npm run build                       : 3 pages built, one footer each
```

## Known follow-up (not part of this feature):
- `src/components/Plans.astro` still ignores `item.link.enlace`; all card
  buttons use `PLANS.reservarHref` (`#reservar`).
