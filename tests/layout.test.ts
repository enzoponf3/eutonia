import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function read_source(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

describe("brand fonts", () => {
  it("ships the woff2 files with the site", () => {
    for (const file of [
      "cormorant-garamond.woff2",
      "cormorant-garamond-italic.woff2",
      "caveat.woff2",
    ]) {
      expect(existsSync(join(ROOT, "public/fonts", file))).toBe(true);
    }
  });

  it("declares local font faces for the formal and organic families", () => {
    const css = read_source("src/styles/global.css");
    expect(css).toContain('url("/fonts/cormorant-garamond.woff2")');
    expect(css).toContain('url("/fonts/cormorant-garamond-italic.woff2")');
    expect(css).toContain('url("/fonts/caveat.woff2")');
  });

  it("does not rely on external Google Fonts", () => {
    const layout = read_source("src/layouts/Layout.astro");
    expect(layout).not.toContain("fonts.googleapis.com");
    expect(layout).not.toContain("fonts.gstatic.com");
  });
});

describe("first section frame", () => {
  it("keeps the header over a full viewport hero", () => {
    const header = read_source("src/components/Header.astro");
    const hero = read_source("src/components/Hero.astro");
    expect(header).toContain("fixed");
    expect(header).toContain("top-0");
    expect(hero).toContain("min-h-[100dvh]");
    expect(hero).not.toContain("min-h-screen");
  });

  it("anchors the copy to the right side of the photo", () => {
    const hero = read_source("src/components/Hero.astro");
    expect(hero).toContain("justify-end");
    expect(hero).toContain("bg-gradient-to-l");
  });
});

describe("description section", () => {
  it("renders after the hero", () => {
    const page = read_source("src/pages/index.astro");
    expect(page.indexOf("<Hero")).toBeGreaterThan(-1);
    expect(page.indexOf("<Description")).toBeGreaterThan(page.indexOf("<Hero"));
  });

  it("lays the cards out in three columns", () => {
    const description = read_source("src/components/Description.astro");
    expect(description).toContain("md:grid-cols-3");
    expect(description).toContain("DESCRIPTION.items.map");
  });

  it("puts the icon beside the text on mobile and centered on desktop", () => {
    const description = read_source("src/components/Description.astro");
    expect(description).toContain("flex-row");
    expect(description).toContain("md:flex-col");
    expect(description).toContain("md:items-center");
  });
});

describe("gerda section", () => {
  it("renders after the description", () => {
    const page = read_source("src/pages/index.astro");
    expect(page.indexOf("<Gerda")).toBeGreaterThan(-1);
    expect(page.indexOf("<Gerda")).toBeGreaterThan(
      page.indexOf("<Description"),
    );
  });

  it("uses the photo and quote from the site content", () => {
    const gerda = read_source("src/components/Gerda.astro");
    expect(gerda).toContain("GERDA.image");
    expect(gerda).toContain("GERDA.quote");
    expect(gerda).toContain("GERDA.author");
  });

  it("groups the photo and quote with semantic quote markup", () => {
    const gerda = read_source("src/components/Gerda.astro");
    expect(gerda).toContain("<figure");
    expect(gerda).toContain("<blockquote");
    expect(gerda).toContain("<figcaption");
  });

  it("defers the off screen photo and reserves its space", () => {
    const gerda = read_source("src/components/Gerda.astro");
    expect(gerda).toContain('loading="lazy"');
    expect(gerda).toContain('width="330"');
    expect(gerda).toContain('height="330"');
  });
});

describe("reviews section", () => {
  it("renders after the plans and before the location", () => {
    const page = read_source("src/pages/index.astro");
    expect(page.indexOf("<Reviews")).toBeGreaterThan(-1);
    expect(page.indexOf("<Reviews")).toBeGreaterThan(page.indexOf("<Plans"));
    expect(page.indexOf("<Reviews")).toBeLessThan(page.indexOf("<Location"));
  });

  it("renders the reviews inside a carousel track", () => {
    const reviews = read_source("src/components/Reviews.astro");
    expect(reviews).toContain("REVIEWS.items.map");
    expect(reviews).toContain("data-reviews-carousel");
    expect(reviews).toContain("data-reviews-track");
    expect(reviews).toContain("data-reviews-slide");
    expect(reviews).toContain("<ul");
    expect(reviews).toContain("<li");
    expect(reviews).toContain("slide.name");
    expect(reviews).toContain("slide.comment");
  });

  it("repeats the reviews so the carousel loops in both directions", () => {
    const reviews = read_source("src/components/Reviews.astro");
    expect(reviews).toContain("const COPIES = 3");
    expect(reviews).toContain("length: COPIES");
    expect(reviews).toContain("index += real_count");
    expect(reviews).toContain("index -= real_count");
  });

  it("moves only through the previous and next arrows", () => {
    const reviews = read_source("src/components/Reviews.astro");
    expect(reviews).toContain("data-reviews-prev");
    expect(reviews).toContain("data-reviews-next");
    expect(reviews).toContain('aria-label="Testimonio anterior"');
    expect(reviews).toContain('aria-label="Testimonio siguiente"');
    expect(reviews).not.toContain("setInterval");
    expect(reviews).not.toContain("autoplay");
  });

  it("places stars, comment and author centered in that order", () => {
    const reviews = read_source("src/components/Reviews.astro");
    expect(reviews).toContain("items-center justify-center");
    const stars = reviews.indexOf("data-reviews-stars");
    const comment = reviews.indexOf("data-reviews-comment");
    const author = reviews.indexOf("data-reviews-author");
    expect(stars).toBeGreaterThan(-1);
    expect(comment).toBeGreaterThan(stars);
    expect(author).toBeGreaterThan(comment);
  });

  it("gives the next arrow the accent background", () => {
    const reviews = read_source("src/components/Reviews.astro");
    const next = reviews.indexOf("data-reviews-next");
    const next_button = reviews.slice(next - 400, next + 600);
    expect(next_button).toContain("bg-accent");
  });

  it("scales the active review to 60% width and fades the sides", () => {
    const css = read_source("src/styles/global.css");
    expect(css).toContain("flex: 0 0 60%");
    expect(css).toContain("transform: scale(1.1)");
    expect(css).toContain("mask-image");
    expect(css).toContain(".reviews-slide.is-active");
  });

  it("lets every card size itself to its own content", () => {
    const css = read_source("src/styles/global.css");
    const reviews = read_source("src/components/Reviews.astro");
    expect(css).toContain("align-items: center");
    expect(reviews).not.toContain('class="flex h-full');
  });

  it("re-normalises the loop without replaying the scale animation", () => {
    const css = read_source("src/styles/global.css");
    const reviews = read_source("src/components/Reviews.astro");
    expect(reviews).toContain("is-resetting");
    expect(reviews).toContain("requestAnimationFrame");
    expect(css).toContain(".reviews-carousel.is-resetting");
  });

  it("shows a person icon and an accessible five star rating", () => {
    const reviews = read_source("src/components/Reviews.astro");
    expect(reviews).toContain('aria-hidden="true"');
    expect(reviews).toContain("Array.from({ length: 5 })");
    expect(reviews).toContain("star_index < slide.rating");
    expect(reviews).toContain("de 5 estrellas");
    expect(reviews).toContain("sr-only");
  });
});

describe("location section", () => {
  it("renders after the plans", () => {
    const page = read_source("src/pages/index.astro");
    expect(page.indexOf("<Location")).toBeGreaterThan(-1);
    expect(page.indexOf("<Location")).toBeGreaterThan(
      page.indexOf("<Plans"),
    );
  });

  it("shows the place and address beside the map", () => {
    const location = read_source("src/components/Location.astro");
    expect(location).toContain("LOCATION.place");
    expect(location).toContain("LOCATION.address");
    expect(location).toContain("md:grid-cols-2");
  });

  it("embeds an accessible, lazily loaded Google map", () => {
    const location = read_source("src/components/Location.astro");
    expect(location).toContain("<iframe");
    expect(location).toContain("LOCATION.map_url");
    expect(location).toContain("title={`Mapa de ${LOCATION.place}`}");
    expect(location).toContain('loading="lazy"');
    expect(location).toContain("allowfullscreen");
  });

  it("opens directions in a new tab", () => {
    const location = read_source("src/components/Location.astro");
    expect(location).toContain("LOCATION.directions_url");
    expect(location).toContain('target="_blank"');
    expect(location).toContain('rel="noopener noreferrer"');
  });
});

describe("contact section", () => {
  it("renders after the location", () => {
    const page = read_source("src/pages/index.astro");
    expect(page.indexOf("<Contact")).toBeGreaterThan(-1);
    expect(page.indexOf("<Contact")).toBeGreaterThan(
      page.indexOf("<Location"),
    );
  });

  it("shows the facilitator number and a WhatsApp action", () => {
    const contact = read_source("src/components/Contact.astro");
    expect(contact).toContain("CONTACT.phone");
    expect(contact).toContain("CONTACT.whatsapp_url");
  });

  it("opens the WhatsApp chat in a new tab", () => {
    const contact = read_source("src/components/Contact.astro");
    expect(contact).toContain("CONTACT.whatsapp_url");
    expect(contact).toContain('target="_blank"');
    expect(contact).toContain('rel="noopener noreferrer"');
  });

  it("turns the header Contacto link into a styled WhatsApp link", () => {
    const header = read_source("src/components/Header.astro");
    expect(header).toContain("link.external");
    expect(header).toContain("border-secondary");
    expect(header).toContain('target={link.external ? "_blank" : undefined}');
    expect(header).toContain(
      'rel={link.external ? "noopener noreferrer" : undefined}',
    );
  });
});

describe("eutonia page", () => {
  it("ships the page at its own route", () => {
    expect(existsSync(join(ROOT, "src/pages/eutonia.astro"))).toBe(true);
  });

  it("centers the full tree at the top of the page", () => {
    const page = read_source("src/pages/eutonia.astro");
    expect(page).toContain("EUTONIA.hero_image");
    expect(page).toContain("mx-auto h-auto w-full max-w-xl");
    expect(page).toContain("text-center");
    expect(page).toContain('fetchpriority="high"');
  });

  it("alternates images, sublines and abstract patterns", () => {
    const page = read_source("src/pages/eutonia.astro");
    expect(page).toContain("EUTONIA.sections.map");
    expect(page).toContain("section.image");
    expect(page).toContain('aria-hidden="true"');
    expect(page).toContain("font-organic");
    expect(page).toContain("md:order-1");
    expect(page).toContain("md:order-2");
  });

  it("closes with the principles and a reservation action", () => {
    const page = read_source("src/pages/eutonia.astro");
    expect(page).toContain("EUTONIA.principles.items");
    expect(page).toContain("ACTIONS.primary.label");
    expect(page).toContain('href="/#reservar"');
    expect(page).toContain("CONTACT.whatsapp_url");
  });

  it("marks the current page in the header navigation", () => {
    const header = read_source("src/components/Header.astro");
    expect(header).toContain("active_label");
    expect(header).toContain('aria-current={active ? "page" : undefined}');
    expect(header).toContain('path.includes("/sobre-mi")');
  });
});

describe("about page", () => {
  it("ships the page at /sobre-mi", () => {
    expect(existsSync(join(ROOT, "src/pages/sobre-mi.astro"))).toBe(true);
  });

  it("puts the portrait at the top left and the bio at its right", () => {
    const page = read_source("src/pages/sobre-mi.astro");
    expect(page).toContain("ABOUT.image");
    expect(page).toContain("md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]");
    expect(page).toContain("items-start");
    expect(page).toContain("ABOUT.journey.paragraphs.map");
    expect(page).toContain('fetchpriority="high"');
  });

  it("mixes images, sublines, colors and abstract patterns", () => {
    const page = read_source("src/pages/sobre-mi.astro");
    expect(page).toContain("ABOUT.approach.image");
    expect(page).toContain("ABOUT.values.items.map");
    expect(page).toContain("font-organic");
    expect(page).toContain('aria-hidden="true"');
    expect(page).toContain("text-secondary");
    expect(page).toContain("text-primary");
  });

  it("ships the facilitator portrait asset", () => {
    expect(existsSync(join(ROOT, "public/photos/facilitator.svg"))).toBe(true);
  });

  it("closes with a reservation action", () => {
    const page = read_source("src/pages/sobre-mi.astro");
    expect(page).toContain("ACTIONS.primary.label");
    expect(page).toContain('href="/#reservar"');
    expect(page).toContain("CONTACT.whatsapp_url");
  });
});

describe("fixed reserve action", () => {
  it("is mounted on every page from the layout", () => {
    const layout = read_source("src/layouts/Layout.astro");
    expect(layout).toContain("<FixedReserve />");
    expect(layout).toContain(
      'import FixedReserve from "../components/FixedReserve.astro"',
    );
  });

  it("links to the plans section", () => {
    const component = read_source("src/components/FixedReserve.astro");
    expect(component).toContain("ACTIONS.primary.href");
    expect(component).toContain("data-reserve-fab");
  });

  it("hides at the top and when the plans are fully visible", () => {
    const component = read_source("src/components/FixedReserve.astro");
    expect(component).toContain("window.scrollY <= 80");
    expect(component).toContain('getElementById("reservar")');
    expect(component).toContain("intersectionRatio >= 0.99");
    expect(component).toContain("classList.toggle");
    expect(component).toContain('"is-visible"');
  });

  it("respects reduced motion in the attention pulse", () => {
    const css = read_source("src/styles/global.css");
    expect(css).toContain("@keyframes reserveRing");
    expect(css).toContain(".reserve-pulse::after");
    expect(css).toMatch(
      /prefers-reduced-motion: reduce[\s\S]*\.reserve-pulse::after/,
    );
  });

  it("styles the nav Reservar like the fixed primary action", () => {
    const header = read_source("src/components/Header.astro");
    expect(header).toContain('const is_primary = link.label === "Reservar"');
    expect(header).toContain("bg-primary px-4 py-2");
  });
});

describe("animations", () => {
  it("fades the hero copy in when the page loads", () => {
    const hero = read_source("src/components/Hero.astro");
    expect(hero).toContain("animate-hero");
    expect(hero).toContain("animate-hero-delay-1");
    expect(hero).toContain("animate-hero-delay-2");

    const css = read_source("src/styles/global.css");
    expect(css).toContain("@keyframes heroFadeIn");
    expect(css).toContain("animation: heroFadeIn 1s ease-out both");
  });

  it("animates the Gerda photo before revealing the text", () => {
    const gerda = read_source("src/components/Gerda.astro");
    expect(gerda).toContain("gerda-reveal");
    expect(gerda).toContain("gerda-img");
    expect(gerda).toContain("gerda-text");
    expect(gerda).toContain("gerda-caption");

    const css = read_source("src/styles/global.css");
    expect(css).toContain("@keyframes gerdaImageIn");
    expect(css).toContain("@keyframes gerdaTextAppear");
    expect(css).toMatch(
      /\.gerda-reveal\.visible \.gerda-img \{\s*animation: gerdaImageIn 1\.4s/,
    );
    expect(css).toMatch(
      /\.gerda-reveal\.visible \.gerda-text \{\s*animation: gerdaTextAppear 0\.9s ease-out 1\.4s/,
    );
  });

  it("respects the reduced motion preference", () => {
    const css = read_source("src/styles/global.css");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toMatch(
      /prefers-reduced-motion: reduce[\s\S]*\.js \.gerda-reveal \.gerda-img/,
    );
  });

  it("adds reveal animations to the Eutonia page", () => {
    const eutonia = read_source("src/pages/eutonia.astro");
    expect(eutonia).toContain('class="relative overflow-hidden bg-stone-50 pt-32 pb-16 sm:pt-40 sm:pb-24"');
    expect(eutonia).toContain("animate-hero");
    expect(eutonia).toContain("animate-hero-delay-1");
    expect(eutonia).toContain("animate-hero-delay-2");
    expect(eutonia).toContain(".reveal-anim");
    expect(eutonia).toContain(".reveal-content");

    const css = read_source("src/styles/global.css");
    expect(css).toContain(".reveal-anim");
    expect(css).toContain(".reveal-content");
    expect(css).toContain("@keyframes revealFadeIn");
    expect(css).toContain("animation: revealFadeIn 0.8s ease-out forwards");
  });

  it("uses IntersectionObserver for reveal animations on the Eutonia page", () => {
    const eutonia = read_source("src/pages/eutonia.astro");
    expect(eutonia).toContain('const revealTargets = document.querySelectorAll(".reveal-anim")');
    expect(eutonia).toContain("new IntersectionObserver");
    expect(eutonia).toContain("{ threshold: 0.2 }");
    expect(eutonia).toContain('observer.unobserve(entry.target)');
    expect(eutonia).toContain("(prefers-reduced-motion: reduce)");
  });
});
