import { CSSProperties, Theme } from "@mui/material";

type ToggleTabGroupColors = "nuteral";
type ToggleTabGroupVariants = "contained";
type ToggleTabGroupSizes = "medium" | "small";

// * -------start-------- toggleTabGroupSize.ts ---------------
interface ToggleTabGroupSizeProps {
  size: ToggleTabGroupSizes;
  theme: Theme;
}
interface ToggleTabGroupSizeReturn {
  rootSize: CSSProperties;
  toggleTabSize: CSSProperties;
  dividerSize: CSSProperties;
}
// * -------end-------- toggleTabGroupSize.ts ---------------

// * -------start-------- toggleTabGroupTheme.ts ---------------
interface ToggleTabGroupThemeProps {
  variant: ToggleTabGroupVariants;
  color: ToggleTabGroupColors;
  theme: Theme;
}
interface ToggleTabGroupThemeReturn {
  rootStyle: CSSProperties;
  selectedTab: CSSProperties;
  notSelectedTab: CSSProperties;
  dividerStyle: CSSProperties;
}
// * -------end-------- toggleTabGroupTheme.ts ---------------

export type {
  ToggleTabGroupSizeProps,
  ToggleTabGroupSizeReturn,
  ToggleTabGroupThemeProps,
  ToggleTabGroupThemeReturn,
};
