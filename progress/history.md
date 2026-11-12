## 2026-11-11 — Feature 9: plans

- Added `PLANS` to `src/lib/site.ts`: title "Lugar", subtitle "Horario y frecuencias",
  three items (Online, Mensual, 1 Clase) with description and frequency, plus
  `reservarHref`.
- Added `src/components/Plans.astro`: white section with `id="reservar"`,
  `scroll-mt-28`, a `md:grid-cols-3` grid of plan cards. Each card shows the plan
  label (large), a short description, the frequency and a `Reservar` button in the
  primary color `#5c5f3f`.
- `src/pages/index.astro` now renders `<Hero />`, `<Description />`, `<Gerda />`,
  `<Plans />`.
- Tests: added a PLANS section to `tests/site.test.ts` (3 items, labels, frequency
  strings, href wiring) and a plans section suite to `tests/layout.test.ts`
  (render order, card count, button label, anchor target).
- Fixed two pre-existing test failures in `src/lib/site.ts`:
  - `SITE.name` was `"Eutonia y meditación"` → changed to `"Eutonia... y algo más"`
    (matching the acceptance criteria).
  - `DESCRIPTION.items[0].icon` was `/selflove.svg` → changed to `/meditation.svg`
    (matching the test expectation and the actual asset in `public/`).
- Verification: `npm test` (38 passed), `npm run check` (0 errors), `npm run build`
  (1 page), `./init.sh` exit 0.

## 2026-11-11 — Feature 8: animations

- Hero: kept the on-load fade (`animate-hero`) and added staggered delays
  (`animate-hero-delay-1/2`) for the paragraph and the Reservar action.
- Gerda: the figure now uses `gerda-reveal`; the photo (`gerda-img`) fades/scales
  in over 1.4s, then the quote (`gerda-text`) and caption (`gerda-caption`) appear
  with 1.4s/1.8s delays so the picture animation finishes first.
- `src/pages/index.astro`: IntersectionObserver now reveals `.gerda-reveal`
  elements once and marks them visible immediately when reduced motion is set.
- `src/layouts/Layout.astro`: inline `js` class on `<html>` so reveal targets stay
  visible when JavaScript is unavailable.
- `src/styles/global.css`: added Gerda keyframes/delays, removed dead
  `.scroll-reveal` rules, kept a `prefers-reduced-motion: reduce` fallback.
- Tests: added an `animations` suite to `tests/layout.test.ts` (hero classes,
  Gerda animation classes and 1.4s sequencing, reduced-motion rule).
- Verification: `npm test` (41 passed), `npm run check` (0 errors), `npm run build`
  (1 page), `./init.sh` exit 0.

## 2026-11-11 — Feature 10: location

- Added `LOCATION` to `src/lib/site.ts`: eyebrow "El espacio", title
  "¿Dónde nos encontramos?", place "Gymdance", the full address, a keyless
  Google Maps embed URL and a directions URL.
- Added `src/components/Location.astro`: two-column section (`id="ubicacion"`,
  `scroll-mt-28`) with a styled address card (secondary color, "Cómo llegar"
  button opening in a new tab) and an accessible, lazily loaded map iframe.
- `src/pages/index.astro` now renders `<Location />` after `<Plans />`.
- Tests: added `LOCATION` coverage to `tests/site.test.ts` and a location section
  suite to `tests/layout.test.ts` (render order, address/card markup, iframe
  attributes, new-tab directions link).
- Verification: `npm test` (49 passed), `npm run check` (0 errors), `npm run build`
  (1 page), `./init.sh` exit 0.

## 2026-11-11 — Feature 11: contact

- Added `CONTACT` to `src/lib/site.ts`: eyebrow "Contacto", title "Hablemos",
  a short invitation, the facilitator number `+54 9 11 4060-9024` and the
  generated WhatsApp URL.
- Added `build_whatsapp_url(phone)`: strips non-digits, validates a minimum
  length (throws `Invalid phone number`) and returns `https://wa.me/<digits>`.
- `NAV_LINKS` contact entry now points to the WhatsApp URL with `external: true`;
  the header renders external links with `target="_blank"`/`rel="noopener noreferrer"`
  and styles Contacto as an outlined secondary pill (secondary color).
- Added `src/components/Contact.astro`: primary-colored closing section
  (`id="contacto"`, `scroll-mt-28`) with the phone number and a white WhatsApp
  button (inline WhatsApp glyph) opening the chat in a new tab.
- `src/pages/index.astro` renders `<Contact />` after `<Location />`.
- Tests: `CONTACT` + `build_whatsapp_url` happy/error paths in
  `tests/site.test.ts`, updated NAV_LINKS coverage, and a contact suite in
  `tests/layout.test.ts` (render order, number/WhatsApp action, new tab, header
  secondary styling).
- Note: `./init.sh` must be run with Git Bash (`C:\Program Files\Git\bin\bash.exe`);
  the `bash` on PATH is WSL and does not see the Windows Node install.
- Verification: `npm test` (58 passed), `npm run check` (0 errors), `npm run build`
  (1 page), `./init.sh` exit 0 (Git Bash).

## 2026-11-11 — Feature 12: Eutonía page

- Added `EUTONIA` to `src/lib/site.ts`: eyebrow, title, subtitle, intro,
  statement, two detail sections (name and origin) with image/caption/paragraphs
  and aspect classes, three practice principles and the closing CTA copy.
- `NAV_LINKS` now includes "Eutonía" → `/eutonia`; all internal links use
  root relative paths (`/#inicio`, `/#sobre-mi`, `/#reservar`) so the header works
  from any page. The header marks the current section with `aria-current="page"`
  and a primary color.
- Added `src/pages/eutonia.astro`: centered `/full-tree.svg` hero (high fetch
  priority, fixed dimensions to avoid CLS), intro, large organic statement,
  alternating image/text sections with primary/secondary/accent sublines and
  decorative ring patterns, three principles with icons, and a primary
  "Reservar" + WhatsApp closing CTA.
- Tests: `EUTONIA` content suite in `tests/site.test.ts`, updated `NAV_LINKS`
  coverage and a `eutonia page` + header active state suite in
  `tests/layout.test.ts`.
- Verification: `npm test` (69 passed), `npm run check` (0 errors), `npm run build`
  (2 pages), `./init.sh` exit 0 (Git Bash).

## 2026-11-11 — Feature 13: Sobre mí page

- Added `ABOUT` to `src/lib/site.ts`: eyebrow, title, portrait, intro,
  "Mi recorrido" paragraphs, practice space image, three values and CTA copy.
- `NAV_LINKS` now points "Sobre mí" to `/sobre-mi`; the shared header resolves
  the active label for `/eutonia`, `/sobre-mi` and home (`aria-current="page"`).
- Added `src/pages/sobre-mi.astro`: top-left portrait with the bio and career
  journey on its right, an organic statement band, a "cómo trabajo" section with
  the practice space photo and abstract ring patterns, three value cards and a
  primary Reservar + WhatsApp CTA.
- Added `public/photos/facilitator.svg`, an on-brand placeholder portrait.
  There was no real facilitator photo or verified biography in the repo; the bio
  is draft copy that should be replaced with the facilitator's real details.
- Tests: `ABOUT` suite in `tests/site.test.ts`, nav coverage for `/sobre-mi`,
  and an about page + header active state suite in `tests/layout.test.ts`.
- Verification: `npm test` (80 passed), `npm run check` (0 errors), `npm run build`
  (3 pages), `./init.sh` exit 0 (Git Bash).

## 2026-11-11 — Feature 14: fixed Reservar button

- `ACTIONS.primary.href` now points to `/#reservar`, so the primary action works
  from every page; the nav Reservar entry reuses it.
- Added `src/components/FixedReserve.astro`, mounted in `Layout.astro` after
  `<main>`: a fixed bottom-right primary pill with an accessible name, a
  `reserve-pulse` ring animation and a visibility script. It starts hidden at the
  top (`window.scrollY <= 80`), uses an `IntersectionObserver` on `#reservar`
  to hide while the plans are fully visible (or taller than the viewport and
  filling it), and throttles scroll work with `requestAnimationFrame`.
- `src/styles/global.css`: added the `fixed-reserve` show/hide transition
  (transform/opacity/visibility only), the `reserveRing` keyframes and a
  `prefers-reduced-motion` fallback that removes the transition and pulse.
- `Header.astro`: the nav Reservar is now the same filled primary pill as the
  fixed action (semibold, primary background, shadow); the logo points to
  `/#inicio` so it works from secondary pages.
- Tests: ACTIONS href + nav wiring in `tests/site.test.ts`, and a
  fixed-reserve suite in `tests/layout.test.ts` (layout mount, link target,
  top/plans visibility logic, reduced-motion pulse, nav styling).
- Verification: `npm test` (86 passed), `npm run check` (0 errors), `npm run build`
  (3 pages), `./init.sh` exit 0 (Git Bash).