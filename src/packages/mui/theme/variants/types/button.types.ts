import type { CSSProperties, Theme } from "@mui/material";

// * -----start----- buttonTheme.ts ----------
interface ButtonThemeProps {
  theme: Theme;
  color: "primary" | "success";
  variant: "contained" | "outlined" | "text";
}
interface ButtonThemeReturn {
    rootTheme:CSSProperties
}
// * -----end----- buttonTheme.ts ----------

export type { ButtonThemeProps, ButtonThemeReturn };
