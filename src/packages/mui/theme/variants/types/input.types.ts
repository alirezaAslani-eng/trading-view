import { CSSProperties, Theme } from "@mui/material";

// * ----start---- inputSize.ts ----------
interface InputSizeReturn {
  rootSize: CSSProperties;
  placeholderSize: CSSProperties;
}
interface InputSizeProps {
  theme: Theme;
  size: "small" | "medium";
}
// * ----end---- inputSize.ts ----------

// * ----start---- inputTheme.ts ----------
interface InputThemeReturn {
  rootTheme: CSSProperties;
  focusTheme: CSSProperties;
  placeholderTheme: CSSProperties;
  errorTheme: CSSProperties;
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