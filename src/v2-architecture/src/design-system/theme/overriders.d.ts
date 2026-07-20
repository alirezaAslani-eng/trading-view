import { ButtonThemeProps } from "../variants/types";
import { CustomTypographyVariants } from "./types";

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

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides extends Record<
    ButtonThemeProps["color"],
    true
  > {
    warning: false;
    // error: false;
    info: false;
    secondary: false;
    inherit: false;
  }
  interface ButtonPropsVariantOverrides {
    "on-surface": true;
  }
}
