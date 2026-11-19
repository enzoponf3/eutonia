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
