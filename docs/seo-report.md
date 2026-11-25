# SEO and social cards report — Eutonía y meditación

**Audited:** 2026-11-24  
**Live site:** <https://eutonia.vercel.app>  
**Sources:** live HTML (`/`, `/eutonia`, `/sobre-mi`) and the repository source  
**Not available:** Search Console, Analytics, ranking data, backlink data

> This is a static audit. It does not claim rankings or traffic. The two biggest
> levers for this business are **local SEO** and **service/content pages**; the
> missing social tags are an easy, high-visibility win but are not a direct
> ranking factor.

---

## 1. Executive summary

The site has a clean, fast foundation: static Astro output, semantic sections,
local fonts, responsive layouts, alt text, lazy-loaded below-the-fold images,
and a clear conversion path (WhatsApp, booking form, Instagram).

The main gaps are:

1. **No canonical URLs** and no `site` configured in Astro.
2. **No Open Graph or Twitter/X card tags**, so shared links have no rich preview.
3. **No `robots.txt` and no sitemap** (both return 404 on the live site).
4. **The home page has no `<h1>`**.
5. **Titles are too short and descriptions are inconsistent** in length.
6. **No structured data** (`LocalBusiness`, `Person`, breadcrumbs, services).
7. **No location/service landing pages**, which limits local search visibility.
8. **Duplicate URLs work with and without a trailing slash** (`/eutonia` and
   `/eutonia/` both return 200).
9. **Images are served unoptimized from `public/`**, with the home LCP image
   missing `fetchpriority="high"`.
10. **No measured search/conversion loop** (Search Console, analytics, event
    tracking).

---

## 2. Snapshot

| Page | `<title>` | Length | Meta description | Length | `<h1>` | Canonical | OG | Twitter | JSON-LD |
|---|---|---:|---|---:|---|---|---|---|---|
| `/` | `Eutonía y meditación` | 20 | `Acompañamiento en eutonía en Buenos Aires...` | 93 | **missing** | missing | missing | missing | missing |
| `/eutonia` | `Eutonía \| Eutonía y meditación` | 30 | `Una práctica corporal que enseña a escuchar...` | 107 | `Eutonía` | missing | missing | missing | missing |
| `/sobre-mi` | `Sobre mí \| Eutonía y meditación` | 31 | Full `ABOUT.intro` | **263** | `Acompañar en la búsqueda del bienestar` | missing | missing | missing | missing |

Site-wide:

| Item | Status |
|---|---|
| `lang` | `es` (works; `es-AR` is more precise) |
| `robots.txt` | **404** |
| `sitemap-index.xml` | **404** |
| `site` in `astro.config.mjs` | **missing** |
| `/eutonia` vs `/eutonia/` | both **200** (duplicate URL) |
| `/sobre-mi` vs `/sobre-mi/` | both **200** (duplicate URL) |
| Custom domain | none detected; live on `eutonia.vercel.app` |

---

## 3. What is already good

- Static HTML, no client-side routing, no heavy framework runtime.
- HTTPS and a fast Vercel deployment.
- One unique title and description per page (even if too short/long).
- `charset`, `viewport`, `lang="es"`, favicon, and accessible navigation.
- `aria-current` on the active nav item.
- Local `woff2` fonts with `font-display: swap`; no Google Fonts requests.
- Responsive images with explicit `width`/`height`.
- `loading="lazy"` on below-the-fold images and the map iframe.
- Decorative icons use `alt=""` plus `aria-hidden="true"`.
- Reduced-motion support.
- Clear phone/WhatsApp/Instagram conversion paths.
- `fetchpriority="high"` on the `/eutonia` and `/sobre-mi` hero images.

---

## 4. Missing Twitter/X card tags

The current `<head>` contains only `charset`, `viewport`, `description`,
`generator`, favicon, `title`, and the stylesheet. **There are no `twitter:*`
tags and no `og:*` tags at all.**

### Minimum tags to add

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="PAGE TITLE" />
<meta name="twitter:description" content="PAGE DESCRIPTION" />
<meta name="twitter:image" content="https://eutonia.vercel.app/og/eutonia-meditacion.jpg" />
<meta name="twitter:image:alt" content="Eutonía y meditación en Buenos Aires" />
<meta name="twitter:url" content="https://eutonia.vercel.app/PAGE/" />
```

### Optional tags

Only add these when the accounts exist:

```html
<meta name="twitter:site" content="@eutoniaymeditacion" />
<meta name="twitter:creator" content="@eutoniaymeditacion" />
```

Do **not** invent an X handle. `twitter:site` and `twitter:creator` are optional;
`card`, `title`, `description`, and `image` are the tags that control the preview.

### Image requirements

- Use **1200 × 630 px** (1.91:1), JPG or PNG for maximum compatibility.
- Keep it under 5 MB; target under 300 KB.
- Use an **absolute HTTPS URL**.
- Keep text away from the edges and make it readable at small sizes.
- Add `twitter:image:alt` and `og:image:alt` for accessibility.
- One site-wide image is enough for the first version; later use one per service page.

### Important

X can fall back to Open Graph tags, but since **neither** OG nor Twitter tags
exist, shared links currently have no controlled image or rich preview. The same
tags also power WhatsApp, LinkedIn, Facebook, Slack, and Telegram previews, which
matters because WhatsApp is the main conversion channel.

### Validation

- Share the URL in an X composer draft and check the preview.
- Use a third-party Open Graph/Twitter preview tool.
- Use Facebook Sharing Debugger for `og:*`; re-scrape after deploying.
- Remember that crawlers cache previews; changes may take time to appear.

---

## 5. Missing Open Graph tags

Add these on every page, using the same values as the canonical and metadata:

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Eutonía y meditación" />
<meta property="og:locale" content="es_AR" />
<meta property="og:title" content="PAGE TITLE" />
<meta property="og:description" content="PAGE DESCRIPTION" />
<meta property="og:url" content="CANONICAL URL" />
<meta property="og:image" content="https://eutonia.vercel.app/og/eutonia-meditacion.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Eutonía y meditación en Buenos Aires" />
```

Use `og:type=article` only for future blog posts, together with
`article:published_time` and `article:author`.

---

## 6. Technical SEO priorities

### P0 — Canonical URLs and Astro `site`

Add the production origin to `astro.config.mjs` and emit a self-referencing
canonical on every page:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://eutonia.vercel.app", // or the final custom domain
  trailingSlash: "never",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```bash
npm install @astrojs/sitemap
```

In `Layout.astro`:

```astro
const canonical = new URL(Astro.url.pathname, Astro.site ?? Astro.url).href;
const social_image = new URL(
  image,
  Astro.site ?? Astro.url,
).href;
```

```html
<link rel="canonical" href={canonical} />
<meta property="og:url" content={canonical} />
```

If the final domain is not `eutonia.vercel.app`, use the custom domain and
301-redirect the Vercel domain to it. Do not ship canonicals pointing to a
preview deployment.

### P0 — Fix duplicate URLs

Both `/eutonia` and `/eutonia/` return 200. Pick one policy:

- `trailingSlash: "never"` in Astro, plus a Vercel redirect to the no-slash
  version; or
- `trailingSlash: "always"` and update internal links to include the slash.

The canonical tag is the safety net, but redirects are cleaner. Keep the
canonical, internal links, sitemap, and `og:url` consistent.

### P0 — Add `robots.txt` and a sitemap

The live site currently returns 404 for both. Add a static `public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://eutonia.vercel.app/sitemap-index.xml
```

Then submit the sitemap in Google Search Console and Bing Webmaster Tools.
`@astrojs/sitemap` generates `sitemap-index.xml` (and the page sitemap) at build
time. If you use a custom domain, update the sitemap URL.

If Vercel preview deployments are publicly reachable, prevent them from being
indexed with Deployment Protection or a preview-only `X-Robots-Tag: noindex`
header. Never let a preview URL become the canonical.

### P0 — One `<h1>` per page

The home page has **no `<h1>`**. The hero brand line is a `<p>`:

```astro
<p class="animate-hero font-organic ...">Eutonía y meditación</p>
```

Change it to the page's main heading, for example:

```astro
<h1 class="animate-hero font-organic ...">
  Eutonía y meditación en Buenos Aires
</h1>
```

Keep the visual size by styling the `h1` with the existing classes. On
`/sobre-mi`, consider an `h1` that includes the person and profession, for
example `Andrea Bello, kinesióloga y facilitadora de eutonía`, instead of the
generic `Acompañar en la búsqueda del bienestar`.

### P1 — Titles and descriptions

Titles are 20–31 characters; the home title has no service or location intent.
Descriptions are 93, 107, and 263 characters. Aim for roughly **50–60**
characters in titles and **140–160** characters in descriptions (Google
truncates by pixel width, so these are guidelines).

Recommended metadata:

| Page | Suggested `<title>` | Suggested meta description |
|---|---|---|
| `/` | `Eutonía y meditación en Buenos Aires \| Andrea Bello` (51) | `Clases de eutonía y meditación en Victoria y San Isidro. Tratamiento individual para el dolor crónico y encuentros online. Reservá tu lugar.` (140) |
| `/eutonia` | `Qué es la eutonía y cómo se practica \| Eutonía y meditación` (59) | `Descubrí qué es la eutonía, cómo nació y sus tres pilares: auto-observación, neutralidad y presencia. Práctica corporal en Buenos Aires.` (136) |
| `/sobre-mi` | `Sobre mí: Andrea Bello, kinesióloga \| Eutonía y meditación` (58) | `Andrea Bello, kinesióloga con más de 20 años de experiencia, facilita eutonía y meditación en Buenos Aires. Conocé su recorrido.` (128) |

Do not paste the full About intro into the meta description. Add dedicated
`seo_description` fields or pass a shorter string from each page so visible copy
and metadata can evolve independently.

### P1 — Structured data

Add JSON-LD in the layout or per page. Only mark up facts that are visible and
verifiable. Start with:

- `LocalBusiness` (or `ProfessionalService`) site-wide: name, URL, phone,
  address, area served, image, `sameAs` for Instagram.
- `Person` on `/sobre-mi`: Andrea Bello, job title, URL, `worksFor`.
- `BreadcrumbList` on `/eutonia` and `/sobre-mi`.
- `Service` for the group classes, individual treatment, and online classes
  once each has its own page.

Example `LocalBusiness`:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://eutonia.vercel.app/#business",
  "name": "Eutonía y meditación",
  "url": "https://eutonia.vercel.app/",
  "telephone": "+54 9 11 4060-9024",
  "image": "https://eutonia.vercel.app/og/eutonia-meditacion.jpg",
  "description": "Clases de eutonía y meditación, tratamiento individual y encuentros online en Buenos Aires.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gral. Lavalle 2993",
    "addressLocality": "Victoria",
    "addressRegion": "Buenos Aires",
    "addressCountry": "AR"
  },
  "areaServed": ["Victoria", "San Isidro", "Buenos Aires"],
  "sameAs": ["https://www.instagram.com/eutoniaymeditacion/"]
}
```

Do **not** add `aggregateRating` or `Review` markup for the testimonials.
Google does not award star rich results for self-serving reviews, and invalid
review markup can create manual-action risk. Keep the testimonials as visible
content for conversion.

Add `FAQPage` markup only if you add a real FAQ section. FAQ rich results are
limited, but the content still helps users and AI/search understanding.

### P1 — Local SEO

This is likely the largest opportunity for a local health/wellness business:

1. Create and verify a **Google Business Profile** for the practice.
2. Use consistent **NAP** (name, address, phone) on the site, GBP, Instagram,
   and any directory.
3. Add the address and phone to every page footer, not only the home page.
4. Add a `tel:` link around the phone number.
5. Add a link to the Google Business Profile / directions from the footer.
6. Use the real service area consistently: Victoria, San Isidro, Zona Norte,
   Buenos Aires. The current copy says “Buenos Aires” globally while the
   practice is in Victoria and the treatment in San Isidro; make that explicit.
7. Add location/service pages instead of one generic home page:
   - `/clases-eutonia-victoria`
   - `/tratamiento-eutonia-san-isidro`
   - `/eutonia-online`
8. Do not publish thin duplicate location pages. Each page needs unique copy,
   schedule, audience, directions, FAQ, and a booking CTA.

### P1 — Content and internal linking

The site has only three pages, and the home page carries all service intent.
Create content that matches how people search:

- “Qué es la eutonía y para qué sirve”
- “Eutonía para el dolor crónico”
- “Eutonía y meditación: diferencias y relación”
- “Tu primera clase de eutonía: qué esperar”
- “Sensopercepción: ejercicios para volver al cuerpo”
- “Eutonía en Victoria: cómo llegar y qué llevar”

Each article should have a unique title, description, H1, author byline, and a
link back to the relevant service page and booking CTA. Add contextual internal
links from the home page to `/eutonia`, `/sobre-mi`, and each service page.
Add a footer navigation block with links to all pages; the current footer only
has social/contact actions.

Use descriptive anchor text. The three plan CTAs currently all say “Reservar”;
use “Reservar clase presencial”, “Reservar tratamiento individual”, and
“Reservar clase online” (visible text or `aria-label`).

### P2 — Images and Core Web Vitals

The site is light overall, but the hero and photo assets can be improved:

- `public/photos/inicio-3.webp` is ~367 KB and is the home LCP image.
  Add `fetchpriority="high"` and consider a `<link rel="preload">` for it.
- `public/photos/espacio-2.jpg` is ~835 KB and `espacio.webp` is ~547 KB.
  Convert to AVIF/WebP and generate responsive widths.
- Images in `public/` bypass Astro's image optimization. Prefer
  `src/assets/` with Astro `<Image>` / `<Picture>` and `widths`/`sizes`.
- Add `decoding="async"` to non-critical images.
- Serve each image at the size it is displayed; 1600 px-wide files are often
  unnecessary on mobile.
- Keep explicit `width`/`height` (already done) to prevent CLS.
- The map iframe is lazy-loaded, which is good; keep it that way.

### P2 — Trust and E-E-A-T

Health-adjacent content is held to a higher trust standard:

- Add a short author box with credentials and, if available, professional
  license/association details.
- Add “last updated” dates to articles and service pages.
- Add a privacy policy covering WhatsApp, Google Forms, and analytics.
- Proofread visible copy. Examples currently on the site include
  “convenciada”, “inmumerables”, “orgáncio”, “estonia”, “mmarme”, and
  “Mas disponibilidad”.
- Add a clear business identity: who runs it, where, since when, and how to
  verify it.
- Add `rel="me"` to the Instagram link and include it in `sameAs`.

### P2 — Measurement

Add and use:

- Google Search Console (verify the domain, submit the sitemap).
- Bing Webmaster Tools.
- Privacy-friendly analytics or GA4.
- Event tracking for WhatsApp clicks, booking clicks, Instagram clicks, and
  Google Maps/directions clicks.
- A monthly check of queries, impressions, CTR, and pages with zero clicks.

---

## 7. Concrete Astro changes

### `src/lib/site.ts`

- Add `SITE.url` (or rely on `Astro.site`).
- Add a dedicated home SEO title, e.g. `SITE.seo_title`.
- Add per-page `seo_description` values instead of reusing long visible copy.
- Add `SITE.og_image` and `SITE.og_image_alt`.

### `src/layouts/Layout.astro`

Add props and head tags:

```astro
---
interface Props {
  title?: string;
  description?: string;
  image?: string;
  image_alt?: string;
}

const {
  title = "",
  description = SITE.description,
  image = "/og/eutonia-meditacion.jpg",
  image_alt = "Eutonía y meditación en Buenos Aires",
} = Astro.props;

const page_title = build_title(title);
const canonical = new URL(Astro.url.pathname, Astro.site ?? Astro.url).href;
const social_image = new URL(image, Astro.site ?? Astro.url).href;
---
```

```html
<link rel="canonical" href={canonical} />

<meta property="og:type" content="website" />
<meta property="og:site_name" content={SITE.name} />
<meta property="og:locale" content="es_AR" />
<meta property="og:title" content={page_title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={social_image} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={image_alt} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={page_title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={social_image} />
<meta name="twitter:image:alt" content={image_alt} />
<meta name="twitter:url" content={canonical} />
```

Add JSON-LD with `set:html`:

```astro
<script
  type="application/ld+json"
  set:html={JSON.stringify(local_business_schema)}
/>
```

### `src/pages/index.astro`

Pass real home metadata explicitly:

```astro
<Layout
  title="Eutonía y meditación en Buenos Aires"
  description="Clases de eutonía y meditación en Victoria y San Isidro..."
>
```

If `build_title` appends the brand, either add a full-title prop or make the
home title the configured `SITE.seo_title` so it does not become
`Eutonía y meditación en Buenos Aires | Eutonía y meditación`.

### Tests

Add assertions to the existing test suite for:

- exactly one `<h1>` per page;
- canonical, `og:*`, and `twitter:*` tags in the layout;
- `robots.txt` and sitemap output;
- `og:url` matching canonical;
- custom metadata per page.

---

## 8. Recommended roadmap

### Week 1 — P0 quick wins

- [ ] Configure `site` and canonical URLs.
- [ ] Add Open Graph + Twitter card tags and a 1200×630 image.
- [ ] Add `robots.txt` and `@astrojs/sitemap`.
- [ ] Add the missing home `<h1>`.
- [ ] Rewrite titles and meta descriptions.
- [ ] Decide on trailing-slash policy and add redirects.
- [ ] Connect Search Console and submit the sitemap.

### Weeks 2–4 — P1 local and structure

- [ ] Add `LocalBusiness` + `Person` JSON-LD.
- [ ] Create or claim the Google Business Profile.
- [ ] Make NAP consistent across the site and social profiles.
- [ ] Add address/phone to the footer and a `tel:` link.
- [ ] Create the three service/location pages with unique content.
- [ ] Add FAQ content and internal links.
- [ ] Add descriptive booking CTA labels.

### Weeks 5–12 — P2 content and performance

- [ ] Publish 4–6 useful articles targeting real questions.
- [ ] Add author/credential and last-updated information.
- [ ] Add privacy policy and trust pages.
- [ ] Optimize hero and gallery images; add responsive `srcset`.
- [ ] Add analytics and conversion event tracking.
- [ ] Move to a custom domain and redirect the Vercel host.
- [ ] Review Search Console queries monthly and expand what works.

---

## 9. Validation checklist

- [ ] `view-source:` shows canonical, `og:*`, and `twitter:*` on all three pages.
- [ ] `og:url` equals canonical on every page.
- [ ] `og:image` and `twitter:image` are absolute URLs and return 200.
- [ ] The image is 1200×630 and loads in a social preview.
- [ ] Each page has exactly one `<h1>`.
- [ ] Titles are unique and roughly 50–60 characters.
- [ ] Descriptions are unique and roughly 140–160 characters.
- [ ] `robots.txt` returns 200 and points to the sitemap.
- [ ] Sitemap returns 200 and lists all public pages.
- [ ] `/eutonia` and `/eutonia/` resolve to one canonical URL.
- [ ] JSON-LD passes the Schema Markup Validator.
- [ ] Search Console has no “Page with redirect”, “Duplicate, Google chose
      different canonical”, or “Discovered — currently not indexed” surprises.
- [ ] Social previews are checked after deployment (X, WhatsApp, Facebook).
