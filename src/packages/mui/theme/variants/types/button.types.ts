import type { CSSProperties, Theme } from "@mui/material";

// * -----start----- buttonTheme.ts ----------
interface ButtonThemeProps {
  theme: Theme;
  color: "primary" | "success";
  variant: "contained" | "outlined" | "text" | "on-surface";
}
interface ButtonThemeReturn {
  rootTheme: CSSProperties;
}
// * -----end----- buttonTheme.ts ----------

// * -----start----- buttonSize.ts ----------
interface ButtonSizeProps {
  theme: Theme;
  size: "small" | "medium" | "large";
}
interface ButtonSizeReturn {
  rootSize: CSSProperties;
}
// * -----end----- buttonSize.ts ----------

// * -----start----- buttonDisabledTheme.ts ----------
interface ButtonDisabledThemeProps extends Omit<ButtonThemeProps, "color"> {}
interface ButtonDisabledThemeReturn {
  rootTheme: CSSProperties;
}
// * -----end----- buttonDisabledTheme.ts ----------

export type {
  ButtonThemeProps,
  ButtonThemeReturn,
  ButtonDisabledThemeProps,
  ButtonDisabledThemeReturn,
};
