import { CssBaselineProps, CSSProperties, Theme } from "@mui/material";

// * ----start---- inputSize.ts ----------
interface InputSizeReturn {
  rootSize: CssBaselineProps;
  placeholderSize: CssBaselineProps;
}
interface InputSizeProps {
  theme: Theme;
  size: "small" | "medium";
}
// * ----end---- inputSize.ts ----------

// * ----start---- inputTheme.ts ----------
interface InputThemeReturn {
  rootTheme: CssBaselineProps;
  focusTheme: CssBaselineProps;
  placeholderTheme: CssBaselineProps;
  errorTheme: CssBaselineProps;
}
interface InputThemeProps {
  theme: Theme;
  variant: "contained" | "outlined";
  color: "primary";
}
// * ----end---- inputTheme.ts ----------

// * ----start---- textareaSize.ts ----------
interface TextareaSizeProps {
  size: "medium" | "small";
}
interface TextareaSizeReturn {
  rootSize: CSSProperties;
}
// * ----end---- textareaSize.ts ----------

export type {
  InputSizeProps,
  InputSizeReturn,
  InputThemeProps,
  InputThemeReturn,
  TextareaSizeProps,
  TextareaSizeReturn,
};