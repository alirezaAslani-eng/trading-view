import { CSSProperties, Theme } from "@mui/material";

type ToggleButtonGroupColors = "primary" | "nuteral" | "success";
type ToggleButtonGroupVariants = "contained";
type ToggleButtonGroupSizes = "large" | "medium";

// * -------start------- toggleButtonGroupSize.ts ----------
interface ToggleButtonGroupSizeProps {
  size: ToggleButtonGroupSizes;
  theme: Theme;
}
interface ToggleButtonGroupSizeReturn {
  rootSize: CSSProperties;
  toggleButtons: CSSProperties;
}
// * -------end------- toggleButtonGroupSize.ts ----------

// * -------start------- toggleButtonGroupTheme.ts ----------
interface ToggleButtonGroupThemeProps {
  variant: ToggleButtonGroupVariants;
  color: ToggleButtonGroupColors;
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
