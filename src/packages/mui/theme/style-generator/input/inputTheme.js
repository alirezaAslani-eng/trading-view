import { alpha } from "@mui/material";

/**
 * @returns {{rootTheme?:object,focusTheme?:object,placeholderTheme?:object}}
 */
function inputTheme({ theme, variant, color, error }) {
  const shared_style = {
    transition: "all ease 150ms",
  };

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
          ...(error && {
            borderColor: theme.palette.border.error,
            boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.border.error, 0.16)}`,
          }),
        },
        focusTheme: !error && {
          borderColor: theme.palette.border.primary,
          boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.border.primary, 0.16)}`,
        },
        placeholderTheme: {
          color: theme.palette.text.placeHolder,
        },
      },
    },
  };

  return styles?.[color]?.[variant] || styles.primary.contained;
}

export default inputTheme;
