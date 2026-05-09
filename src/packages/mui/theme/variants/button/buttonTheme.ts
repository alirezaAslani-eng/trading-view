import type {
  ButtonThemeProps,
  ButtonThemeReturn,
} from "@/packages/mui/theme/variants/types";

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
    },
  };

  //@ts-ignore
  return styles?.[color]?.[variant] || styles.primary.contained;
}

export default buttonTheme;
