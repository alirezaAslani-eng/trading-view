import type { ButtonThemeProps, ButtonThemeReturn } from "./types";

function buttonTheme({
  theme,
  variant,
  color,
}: ButtonThemeProps): ButtonThemeReturn {
  // * -------- primary theme --------
  const styles = {
    primary: {
      contained: {
        rootTheme: {
          backgroundColor: theme.palette.background.primary,
          color: theme.palette.text.onPrimary,
        },
      } satisfies ButtonThemeReturn,
      outlined: {
        rootTheme: {
          border: "1px solid",
          borderColor: theme.palette.border.primary,
          color: theme.palette.text.primary2,
        },
      } satisfies ButtonThemeReturn,
      "on-surface": {
        rootTheme: {
          border: "1px solid",
          borderColor: theme.palette.border.primary,
          color: theme.palette.text.onPrimary,
          borderRadius: "14px",
        },
      } satisfies ButtonThemeReturn,
      text: {
        rootTheme: {
          backgroundColor: "transparent",
          border: "none",
          color: theme.palette.text.primary2,
        },
      } satisfies ButtonThemeReturn,
    },

    // * -------- success theme --------
    success: {
      contained: {
        rootTheme: {
          backgroundColor: theme.palette.background.buy,
          color: theme.palette.text.onPrimary,
        },
      } satisfies ButtonThemeReturn,
      outlined: {
        rootTheme: {
          border: "1px solid",
          borderColor: theme.palette.status.profit,
          color: theme.palette.text.profit,
        },
      } satisfies ButtonThemeReturn,
      "on-surface": {
        rootTheme: {
          border: "1px solid",
          borderColor: theme.palette.status.profit,
          color: theme.palette.text.onPrimary,
          borderRadius: "14px",
        },
      } satisfies ButtonThemeReturn,
      text: {
        rootTheme: {
          backgroundColor: "transparent",
          border: "none",
          color: theme.palette.text.profit,
        },
      } satisfies ButtonThemeReturn,
    },
    // * -------- error theme --------
    error: {
      contained: {
        rootTheme: {
          backgroundColor: theme.palette.background.sell,
          color: theme.palette.text.onPrimary,
        },
      } satisfies ButtonThemeReturn,
    },
  };

  //@ts-ignore
  const style = styles?.[color]?.[variant] as ButtonThemeReturn | undefined;

  return style || styles.primary.contained;
}

export default buttonTheme;
