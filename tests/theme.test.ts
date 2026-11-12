import { describe, expect, it } from "vitest";
import { FONTS, PALETTE, palette_color } from "../src/lib/theme";

describe("PALETTE", () => {
  it("uses the brand primary color", () => {
    expect(PALETTE.primary).toBe("#5c5f3f");
  });

  it("uses the brand secondary color", () => {
    expect(PALETTE.secondary).toBe("#3f5c5f");
  });

  it("uses the brand accent color", () => {
    expect(PALETTE.accent).toBe("#5f3f5c");
  });
});

describe("FONTS", () => {
  it("defines a formal serif family", () => {
    expect(FONTS.formal).toContain("serif");
  });

  it("defines an organic family", () => {
    expect(FONTS.organic).toContain("cursive");
  });
});

describe("palette_color", () => {
  it("returns the requested color", () => {
    expect(palette_color("primary")).toBe("#5c5f3f");
    expect(palette_color("accent")).toBe("#5f3f5c");
  });

  it("throws on an unknown color", () => {
    expect(() => palette_color("nope")).toThrow(/Unknown palette color/);
  });
});
