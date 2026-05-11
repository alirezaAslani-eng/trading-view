import { CustomTypographyVariants } from "./typography.types";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides extends Record<
    keyof CustomTypographyVariants,
    true
  > {}
}

declare module "@mui/material/Tabs" {
  interface TabsPropsVariantOverrides {
    standard: false;
  }
}