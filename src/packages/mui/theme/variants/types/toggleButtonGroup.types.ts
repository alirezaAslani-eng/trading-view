import { CSSProperties, Theme } from "@mui/material";

// * -------start------- toggleButtonGroupSize.ts ----------
interface ToggleButtonGroupSizeProps {
  size: "large" | "medium";
  theme: Theme;
}
interface ToggleButtonGroupSizeReturn {
  rootSize: CSSProperties;
  toggleButtons: CSSProperties;
}
// * -------end------- toggleButtonGroupSize.ts ----------

// * -------start------- toggleButtonGroupTheme.ts ----------
interface ToggleButtonGroupThemeProps {
  variant: "contained";
  color: "primary" | "nuteral" | "success";
  theme: Theme;
}
interface ToggleButtonGroupThemeReturn {
  rootTheme: CSSProperties;
  notSelected: CSSProperties;
  selected: CSSProperties;
}
// * -------end------- toggleButtonGroupTheme.ts ----------

export type {
  ToggleButtonGroupSizeProps,
  ToggleButtonGroupSizeReturn,
  ToggleButtonGroupThemeProps,
  ToggleButtonGroupThemeReturn,
};
