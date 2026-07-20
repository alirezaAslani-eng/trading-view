import {
  PaginationThemeProps,
  PaginationThemeReturn,
} from "./types";

function paginationTheme({
  theme,
  color,
  variant,
}: PaginationThemeProps): PaginationThemeReturn {
  const { palette } = theme;
  const styles = {
    primary: {
      contained: {
        pageButtonTheme: {
          color: palette.text.onPrimary,
          backgroundColor: palette.background.surfaceTertiary,
        },
        pageSelectedButtonTheme: {
          backgroundColor: palette.background.primary,
          color: palette.text.onPrimary,
        },
        prevNextButtonTheme: {
          color: palette.text.secondary,
        },
        prevNextDisabledButtonTheme: {
          color: palette.text.linkTertiary,
        },

        pageHoverButtonTheme: {
          backgroundColor: palette.background.surfaceTertiary,
          color: palette.text.onPrimary,
        },
        pageHoverSelectedButtonTheme: {
          backgroundColor: palette.background.primary,
          color: palette.text.onPrimary,
        },
      } satisfies PaginationThemeReturn,
    },
  };

  return styles?.[color]?.[variant] || styles.primary.contained;
}

export default paginationTheme;
