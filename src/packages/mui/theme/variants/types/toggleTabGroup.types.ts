import { Theme } from "@mui/material";
import { CSSProperties } from "react";

// * -------start-------- toggleTabGroupSize.ts ---------------
interface ToggleTabGroupSizeProps {
  size: "medium" | "small";
  theme: Theme;
}
interface ToggleTabGroupSizeReturns {
  rootSize: CSSProperties;
  toggleTabSize: CSSProperties;
  dividerSize:CSSProperties
}
// * -------end-------- toggleTabGroupSize.ts ---------------

// * -------start-------- toggleTabGroupTheme.ts ---------------
interface ToggleTabGroupThemeProps {
  theme: Theme;
  color: "nuteral";
  variant: "contained";
}
interface ToggleTabGroupThemeReturns {
  rootStyle: CSSProperties;
  selectedTab: CSSProperties;
  notSelectedTab: CSSProperties;
  dividerStyle:CSSProperties
}
// * -------end-------- toggleTabGroupTheme.ts ---------------

export type {
  ToggleTabGroupSizeProps,
  ToggleTabGroupSizeReturns,
  ToggleTabGroupThemeProps,
  ToggleTabGroupThemeReturns,
};
