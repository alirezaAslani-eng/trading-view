import { CustomPalette } from ".";
import { CustomTypographyVariants, PartialPalette } from ".";

declare module "@mui/material/styles" {
  // * ============ Palette =============
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends PartialPalette<CustomPalette> {}
  interface TypeBackground extends Partial<CustomPalette["background"]> {}
  interface TypeText extends Partial<CustomPalette["text"]> {}

  // * ============ Typography =============
  interface TypographyVariantsOptions extends Partial<CustomTypographyVariants> {}
  interface TypographyVariants extends CustomTypographyVariants {}
}
