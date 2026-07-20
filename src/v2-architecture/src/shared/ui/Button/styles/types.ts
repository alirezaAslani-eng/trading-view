import type { CSSProperties, Theme } from "@mui/material";

type ButtonColors = "primary" | "success" | "error";
type ButtonVarinats = "contained" | "outlined" | "text" | "on-surface";
type ButtonSizes = "small" | "medium" | "large";

// * -----start----- buttonTheme.ts ----------
interface ButtonThemeProps {
  theme: Theme;
  color: ButtonColors;
  variant: ButtonVarinats;
}
interface ButtonThemeReturn {
  rootTheme: CSSProperties;
}
// * -----end----- buttonTheme.ts ----------

// * -----start----- buttonSize.ts ----------
interface ButtonSizeProps {
  theme: Theme;
  size: ButtonSizes;
}
interface ButtonSizeReturn {
  rootSize: CSSProperties;
}
// * -----end----- buttonSize.ts ----------

// * -----start----- buttonDisabledTheme.ts ----------
interface ButtonDisabledThemeProps extends Pick<
  ButtonThemeProps,
  "theme" | "variant"
> {}
interface ButtonDisabledThemeReturn {
  rootTheme: CSSProperties;
}
// * -----end----- buttonDisabledTheme.ts ----------

export type {
  ButtonThemeProps,
  ButtonThemeReturn,
  ButtonDisabledThemeProps,
  ButtonDisabledThemeReturn,
  ButtonSizeProps,
  ButtonSizeReturn,
};
