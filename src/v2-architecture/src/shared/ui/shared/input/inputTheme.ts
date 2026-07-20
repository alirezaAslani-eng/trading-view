import { alpha } from "@mui/material";
import { InputThemeProps, InputThemeReturn } from "./types";

function inputTheme({
  theme,
  variant,
  color,
}: InputThemeProps): InputThemeReturn {
  const shared_style = {
    transition: "all ease 150ms",
  };

  const { palette } = theme;

  const styles = {
    // * ------- primary theme -------
    primary: {
      contained: {
        rootTheme: {
          ...shared_style,
          border: "1px solid",
          borderColor: "transparent",
          backgroundColor: theme.palette.background.inputModal,
          color: theme.palette.text.onPrimary,
        },
        focusTheme: {
          borderColor: theme.palette.border.primary,
          boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.border.primary, 0.16)}`,
        },
        placeholderTheme: {
          color: theme.palette.text.placeHolder,
        },
        errorTheme: {
          borderColor: `${theme.palette.border.error}`,
          boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.border.error, 0.16)}`,
        },
      } satisfies InputThemeReturn,
      outlined: {
        rootTheme: {
          ...shared_style,
          border: "1px solid",
          borderColor: theme.palette.border.default,
          backgroundColor: "transparent",
          color: theme.palette.text.onPrimary,
        },
        focusTheme: {
          borderColor: theme.palette.border.primary,
          boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.border.primary, 0.16)}`,
        },
        placeholderTheme: {
          color: theme.palette.text.placeHolder,
        },
        errorTheme: {
          borderColor: `${theme.palette.border.error}`,
          boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.border.error, 0.16)}`,
        },
      } satisfies InputThemeReturn,
    },
    nuteral: {
      contained: {
        rootTheme: {
          backgroundColor: palette.background.surfaceLevel5,
          color: palette.text.onPrimary,
          border: "1px solid",
          borderColor: palette.border.dark,
        },
        placeholderTheme: {
          color: palette.text.placeHolder,
        },
        errorTheme: {},
        focusTheme: {},
      } satisfies InputThemeReturn,
    },
  };

  //@ts-ignore
  const style = styles?.[color]?.[variant] as InputThemeReturn | undefined;
  return style ?? styles.primary.contained;
}

export default inputTheme;
