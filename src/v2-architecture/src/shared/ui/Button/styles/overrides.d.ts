import "@mui/material/Button";
import type { ButtonThemeProps } from "./types";
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides extends Record<
    ButtonThemeProps["color"],
    true
  > {
    warning: false;
    // error: false;
    info: false;
    secondary: false;
  }
  interface ButtonPropsVariantOverrides {
    "on-surface": true;
  }
}
