import { ButtonThemeProps } from "../variants/types";
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

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsSizeOverrides {
    "x-large": true;
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "xs-mobile": true;
    "xss-mobile": true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}
