import { CSSProperties, Theme } from "@mui/material";

type CheckboxColors = "primary";
type CheckboxSizes = "medium" | "small";
type CheckboxVariants = "contained" | "outlined";

// * ------start------ checkboxSize.ts ------------
interface CheckboxSizeProps {
  size: CheckboxSizes;
}
interface CheckboxSizeReturn {
  rootSize: CSSProperties;
}
// * ------end------ checkboxSize.ts ------------

// * ------start------ checkboxTheme.ts ------------
interface CheckboxThemeProps {
  theme: Theme;
  color: CheckboxColors;
  variant: CheckboxVariants;
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
