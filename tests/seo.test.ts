import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ABOUT, EUTONIA, SITE, build_title } from "../src/lib/site";

const ROOT = process.cwd();
const SITE_ORIGIN = "https://eutoniaymeditacion.com.ar";

function read_source(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

function jpeg_dimensions(path: string): { width: number; height: number } {
  const bytes = readFileSync(join(ROOT, path));
  expect(Array.from(bytes.subarray(0, 2))).toEqual([0xff, 0xd8]);

  let offset = 2;
  while (offset < bytes.length - 9) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    while (bytes[offset] === 0xff) offset += 1;
    const marker = bytes[offset];
    offset += 1;
    if (marker === 0xda || marker === 0xd9) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;

    const length = bytes.readUInt16BE(offset);
    const is_frame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (is_frame) {
      return {
        width: bytes.readUInt16BE(offset + 5),
        height: bytes.readUInt16BE(offset + 3),
      };
    }
    offset += length;
  }
  throw new Error(`No JPEG frame found in ${path}`);
}

describe("production origin", () => {
  it("configures the Astro site and the sitemap integration", () => {
    const config = read_source("astro.config.mjs");
    expect(config).toContain(`site: "${SITE_ORIGIN}"`);
    expect(config).toContain('trailingSlash: "never"');
    expect(config).toContain("import sitemap from \"@astrojs/sitemap\"");
    expect(config).toContain("integrations: [sitemap()]");
  });

  it("normalises trailing slashes on Vercel", () => {
    const vercel = JSON.parse(read_source("vercel.json"));
    expect(vercel).toEqual({ trailingSlash: false });
  });
});

describe("robots and sitemap", () => {
  it("allows crawling and points to the generated sitemap", () => {
    const robots = read_source("public/robots.txt");
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap-index.xml`);
  });
});

describe("social preview image", () => {
  it("serves a 1200x630 JPEG from /og/", () => {
    expect(SITE.og_image).toMatch(/^\/og\/.*\.jpg$/);
    expect(jpeg_dimensions(`public${SITE.og_image}`)).toEqual({
      width: 1200,
      height: 630,
    });
  });
});

describe("layout head tags", () => {
  const layout = read_source("src/layouts/Layout.astro");

  it("emits a self-referencing canonical with a normalised path", () => {
    expect(layout).toContain('<link rel="canonical" href={canonical} />');
    expect(layout).toContain("canonical_path = Astro.url.pathname.replace(");
    expect(layout).toContain(
      "new URL(canonical_path, Astro.site ?? Astro.url).href",
    );
  });

  it("uses the canonical for both OG and Twitter URLs", () => {
    expect(layout).toContain('<meta property="og:url" content={canonical} />');
    expect(layout).toContain('<meta name="twitter:url" content={canonical} />');
  });

  it("renders the Open Graph tags on every page", () => {
    for (const tag of [
      '<meta property="og:type" content="website" />',
      '<meta property="og:site_name" content={SITE.name} />',
      '<meta property="og:locale" content="es_AR" />',
      '<meta property="og:title" content={page_title} />',
      '<meta property="og:description" content={description} />',
      '<meta property="og:image" content={social_image} />',
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      '<meta property="og:image:alt" content={image_alt} />',
    ]) {
      expect(layout).toContain(tag);
    }
  });

  it("renders the Twitter card tags on every page", () => {
    for (const tag of [
      '<meta name="twitter:card" content="summary_large_image" />',
      '<meta name="twitter:title" content={page_title} />',
      '<meta name="twitter:description" content={description} />',
      '<meta name="twitter:image" content={social_image} />',
      '<meta name="twitter:image:alt" content={image_alt} />',
    ]) {
      expect(layout).toContain(tag);
    }
  });

  it("turns the social image path into an absolute URL", () => {
    expect(layout).toContain("new URL(image, Astro.site ?? Astro.url).href");
    expect(layout).toContain("image = SITE.og_image");
    expect(layout).toContain("image_alt = SITE.og_image_alt");
  });
});

describe("page headings", () => {
  it("gives the home page exactly one h1 from the hero title", () => {
    const hero = read_source("src/components/Hero.astro");
    const home = read_source("src/pages/index.astro");
    expect(hero.match(/<h1\b/g)).toHaveLength(1);
    expect(hero).toContain("{HERO.title}");
    expect(home).not.toContain("<h1");
  });

  it("keeps exactly one h1 on the secondary pages", () => {
    for (const page of ["src/pages/eutonia.astro", "src/pages/sobre-mi.astro"]) {
      expect(read_source(page).match(/<h1\b/g)).toHaveLength(1);
    }
  });
});

describe("titles and descriptions", () => {
  it("uses the recommended home title and a focused description", () => {
    expect(build_title("")).toBe(SITE.home_title);
    expect(SITE.home_title).toBe(
      "Eutonía y meditación en Buenos Aires",
    );
    expect(SITE.description).toContain("Victoria y San Isidro");
    expect(SITE.description.length).toBeGreaterThanOrEqual(140);
    expect(SITE.description.length).toBeLessThanOrEqual(160);
  });

  it("uses dedicated metadata for the secondary pages", () => {
    expect(EUTONIA.seo_title).toBe("Qué es la eutonía y cómo se practica");
    expect(ABOUT.seo_title).toBe("Sobre mí: Andrea Bello, kinesióloga");
    for (const description of [
      EUTONIA.seo_description,
      ABOUT.seo_description,
    ]) {
      expect(description.length).toBeGreaterThanOrEqual(140);
      expect(description.length).toBeLessThanOrEqual(160);
    }
  });

  it("passes each page's metadata to the shared layout", () => {
    expect(read_source("src/pages/index.astro")).toContain('<Layout title="">');
    expect(read_source("src/pages/eutonia.astro")).toContain(
      "<Layout title={EUTONIA.seo_title} description={EUTONIA.seo_description}>",
    );
    expect(read_source("src/pages/sobre-mi.astro")).toContain(
      "<Layout title={ABOUT.seo_title} description={ABOUT.seo_description}>",
    );
  });
});
