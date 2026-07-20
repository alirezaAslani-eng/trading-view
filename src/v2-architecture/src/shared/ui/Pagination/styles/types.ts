import { CSSProperties, Theme } from "@mui/material";

type PaginationSizes = "medium";
type PaginationColors = "primary";
type PaginationVariants = "contained";

// * -----start---- paginationSize.ts ---------
interface PaginationSizeProps {
  theme: Theme;
  size: PaginationSizes;
}
interface PaginationSizeReturn {
  pageButtonSize: CSSProperties;
  prevNextButtonSize: CSSProperties;
}
// * -----end---- paginationSize.ts ---------

// * -----start---- paginationTheme.ts ---------
interface PaginationThemeProps {
  theme: Theme;
  variant: PaginationVariants;
  color: PaginationColors;
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
