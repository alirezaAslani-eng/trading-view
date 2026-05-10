import { CSSProperties, Theme } from "@mui/material";

// * -----start---- paginationSize.ts ---------
interface PaginationSizeProps {
  theme: Theme;
  size: "medium";
}
interface PaginationSizeReturn {
  pageButtonSize: CSSProperties;
  prevNextButtonSize: CSSProperties;
}
// * -----end---- paginationSize.ts ---------

// * -----start---- paginationTheme.ts ---------
interface PaginationThemeProps {
  theme: Theme;
  variant: "contained";
  color: "primary";
}
interface PaginationThemeReturn {
  pageButtonTheme: CSSProperties;
  pageSelectedButtonTheme: CSSProperties;
  pageHoverButtonTheme: CSSProperties;
  prevNextButtonTheme: CSSProperties;
  prevNextDisabledButtonTheme: CSSProperties;
  pageHoverSelectedButtonTheme: CSSProperties;
}
// * -----end---- paginationTheme.ts ---------

export type {
  PaginationSizeProps,
  PaginationSizeReturn,
  PaginationThemeProps,
  PaginationThemeReturn,
};
