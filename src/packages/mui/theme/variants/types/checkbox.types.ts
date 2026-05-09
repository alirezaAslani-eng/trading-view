import { CSSProperties, Theme } from "@mui/material";

// * ------start------ checkboxSize.ts ------------
interface CheckboxSizeProps {
  size: "medium" | "small";
}
interface CheckboxSizeReturn {
  rootSize: CSSProperties;
}
// * ------end------ checkboxSize.ts ------------

// * ------start------ checkboxTheme.ts ------------
interface CheckboxThemeProps {
  theme: Theme;
  color: "primary";
  variant: "contained" | "outlined";
}
interface CheckboxThemeReturn {
  rootStyle: CSSProperties;
  checkedTheme: CSSProperties;
  notCheckedTheme: CSSProperties;
}
// * ------end------ checkboxTheme.ts ------------

export type {
  CheckboxSizeProps,
  CheckboxSizeReturn,
  CheckboxThemeProps,
  CheckboxThemeReturn,
};
