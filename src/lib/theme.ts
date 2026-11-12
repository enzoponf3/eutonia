export const PALETTE = {
  primary: "#5c5f3f",
  secondary: "#3f5c5f",
  accent: "#5f3f5c",
} as const;

export type PaletteName = keyof typeof PALETTE;

export const FONTS = {
  formal: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
  organic: '"Caveat", "Segoe Script", cursive',
} as const;

export function palette_color(name: string): string {
  if (!(name in PALETTE)) {
    throw new Error(`Unknown palette color: ${name}`);
  }
  return PALETTE[name as PaletteName];
}
