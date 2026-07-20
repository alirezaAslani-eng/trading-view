import { CSSProperties, Theme } from "@mui/material";
type InputVariants = "contained" | "outlined";
type InputColors = "primary" | "nuteral";
type InputSizes = "medium" | "small" | "large";

// * ----start---- inputSize.ts ----------
interface InputSizeReturn {
  rootSize: CSSProperties;
  placeholderSize: CSSProperties;
}
interface InputSizeProps {
  theme: Theme;
  size: InputSizes;
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
  variant: InputVariants;
  color: InputColors;
}
// * ----end---- inputTheme.ts ----------
// * ----start---- inputDisabled.ts ----------
interface InputDisabledReturn {
  rootTheme: CSSProperties;
  placeholderTheme: CSSProperties;
}
interface InputDisabledProps {
  theme: Theme;
  variant: InputVariants;
  color: InputColors;
}
// * ----end---- inputDisabled.ts ----------

// * ----start---- textareaSize.ts ----------
interface TextareaSizeProps {
  size: InputSizes;
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
  InputDisabledProps,
  InputDisabledReturn,
};
