import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CONTACT, MODAL } from "../src/lib/site";

const ROOT = process.cwd();

function read_source(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

describe("MODAL configuration", () => {
  it("can be switched on and off from the site data", () => {
    expect(typeof MODAL.enabled).toBe("boolean");
    expect(MODAL.enabled).toBe(true);
  });

  it("ships the promo image with a descriptive alternative text", () => {
    expect(MODAL.image).toBe("/photos/promocion.png");
    expect(existsSync(join(ROOT, "public", MODAL.image))).toBe(true);
    expect(MODAL.image_alt.length).toBeGreaterThan(20);
  });

  it("carries a title, a description and a call to action", () => {
    expect(MODAL.title.trim().length).toBeGreaterThan(0);
    expect(MODAL.description.trim().length).toBeGreaterThan(20);
    expect(MODAL.cta.label).toBe("Reservar");
    expect(MODAL.cta.href).toBe(CONTACT.whatsapp_url);
  });

  it("waits before opening and keeps the dismissal key for opt-in sessions", () => {
    expect(MODAL.delay_ms).toBeGreaterThan(0);
    expect(MODAL.show_once).toBe(false);
    expect(MODAL.storage_key.trim().length).toBeGreaterThan(0);
  });
});

describe("modal markup", () => {
  const modal = read_source("src/components/Modal.astro");

  it("uses a native modal dialog", () => {
    expect(modal).toContain("<dialog");
    expect(modal).toContain("data-modal");
    expect(modal).toContain('closedby="any"');
    expect(modal).toContain('aria-labelledby="promo-modal-title"');
    expect(modal).toContain('aria-describedby="promo-modal-description"');
    expect(modal).toContain("showModal()");
  });

  it("is centred over a darker backdrop", () => {
    expect(modal).toContain("m-auto");

    const css = read_source("src/styles/global.css");
    expect(css).toContain(".promo-modal[open]::backdrop");
    expect(css).toContain("background-color: rgb(28 25 23 / 0.75)");
  });

  it("closes with an x button at the top right of the content", () => {
    expect(modal).toContain("data-modal-close");
    expect(modal).toContain('aria-label="Cerrar"');
    expect(modal).toContain("absolute top-3 right-3");
    expect(modal).toContain('<form method="dialog"');
  });

  it("puts the image on the left and the text on its right", () => {
    expect(modal).toContain("md:grid-cols-2");
    expect(modal).toContain("MODAL.image");
    const image = modal.indexOf("MODAL.image");
    const text = modal.indexOf("MODAL.title");
    expect(image).toBeGreaterThan(-1);
    expect(text).toBeGreaterThan(image);
  });

  it("lays the text information beside the image from md up", () => {
    expect(modal).toContain("flex-col justify-center");
    expect(modal).toContain("md:flex");
    expect(modal).toContain("MODAL.eyebrow");
    expect(modal).toContain("MODAL.description");
    expect(modal).toContain("MODAL.cta.label");
    expect(modal).toContain("MODAL.cta.href");
  });

  it("opens after the configured delay on every page load", () => {
    expect(modal).toContain("data-modal-storage={MODAL.storage_key}");
    expect(modal).toContain("data-modal-delay={MODAL.delay_ms}");
    expect(modal).toContain("data-modal-show-once={MODAL.show_once}");
    expect(modal).toContain("window.setTimeout(open, delay)");
    expect(modal).toContain('modal.dataset.modalShowOnce === "true"');
    expect(modal).toContain("if (!show_once || !storage_key) return false;");
  });

  it("can remember the dismissal for the session when show_once is on", () => {
    expect(modal).toContain("window.sessionStorage.getItem(storage_key)");
    expect(modal).toContain("window.sessionStorage.setItem(storage_key");
    expect(modal).toContain("if (!show_once || !storage_key) return;");
  });

  it("can be reopened from any data-modal-open trigger", () => {
    expect(modal).toContain('document.querySelectorAll("[data-modal-open]")');
    expect(modal).toContain('trigger.addEventListener("click", open)');
  });

  it("falls back to light dismiss where closedby is missing", () => {
    expect(modal).toContain(
      '!("closedBy" in HTMLDialogElement.prototype)',
    );
    expect(modal).toContain("modal.addEventListener(\"pointerup\"");
    expect(modal).toContain("modal.close()");
  });

  it("links the promo image to WhatsApp in mobile view", () => {
    const anchors = modal.match(/<a[\s\S]*?<\/a>/g) ?? [];
    const image_link = anchors.find((anchor) =>
      anchor.includes("data-modal-image-link"),
    );

    expect(image_link).toBeDefined();
    expect(image_link).toContain("CONTACT.whatsapp_url");
    expect(image_link).toContain("MODAL.image");
    expect(image_link).toContain('target="_blank"');
    expect(image_link).toContain('rel="noopener noreferrer"');
    expect(image_link).toContain(
      'aria-label="Escribir por WhatsApp para reservar la promoción"',
    );
    expect(modal.indexOf('<div class="md:hidden">')).toBeGreaterThan(-1);
    expect(modal.indexOf("data-modal-image-link")).toBeGreaterThan(
      modal.indexOf('<div class="md:hidden">'),
    );
  });

  it("keeps the desktop image out of the WhatsApp link", () => {
    const anchors = modal.match(/<a[\s\S]*?<\/a>/g) ?? [];
    const desktop_image = anchors.find((anchor) =>
      anchor.includes("md:block md:max-h-[85dvh]"),
    );

    expect(desktop_image).toBeUndefined();
    expect(modal).toContain(
      'class="hidden h-auto w-full object-contain md:block md:max-h-[85dvh]"',
    );
  });

  it("closes before following the call to action", () => {
    expect(modal).toContain(
      '"[data-modal-cta], [data-modal-image-link]"',
    );
    expect(modal.indexOf("[data-modal-cta]")).toBeLessThan(
      modal.indexOf("modal.close()"),
    );
  });
});

describe("modal styles", () => {
  const css = read_source("src/styles/global.css");

  it("keeps the page behind the dialog from scrolling", () => {
    expect(css).toContain("overscroll-behavior: contain");
    expect(css).toMatch(
      /\.promo-modal::backdrop \{\s*overflow: hidden;\s*overscroll-behavior: contain;/,
    );
  });

  it("animates the dialog in from the top layer", () => {
    expect(css).toContain("@starting-style");
    expect(css).toContain("transition-behavior: allow-discrete");
    expect(css).toMatch(/transition-property: opacity, transform, display, overlay;/);
  });

  it("respects the reduced motion preference", () => {
    expect(css).toMatch(
      /prefers-reduced-motion: reduce[\s\S]*\.promo-modal \{\s*transition-duration: 100ms;/,
    );
  });
});

describe("modal mounting", () => {
  it("is mounted once on every page from the layout", () => {
    const layout = read_source("src/layouts/Layout.astro");
    expect(layout).toContain('import Modal from "../components/Modal.astro"');
    expect(layout).toContain("<Modal />");
    expect(layout.indexOf("<Modal />")).toBeGreaterThan(
      layout.indexOf("<slot />"),
    );
    expect(layout.match(/<Modal \/>/g)).toHaveLength(1);
  });
});
