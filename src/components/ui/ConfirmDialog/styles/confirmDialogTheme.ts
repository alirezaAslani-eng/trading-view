import { alpha } from "@mui/material";
import type {
  ConfirmDialogThemeProps,
  ConfirmDialogThemeReturn,
} from "./types";

function confirmDialogTheme({
  theme,
  color,
}: ConfirmDialogThemeProps): ConfirmDialogThemeReturn {
  const styles = {
    primary: {
      iconTheme: {
        backgroundColor: alpha(theme.palette.background.primary!, 0.1),
        color: theme.palette.background.primary,
      },
      acceptTheme: {
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.onPrimary,
      },
    },

    success: {
      iconTheme: {
        backgroundColor: alpha(theme.palette.background.buy!, 0.1),
        color: `${theme.palette.background.buy}`,
      },
      acceptTheme: {
        backgroundColor: theme.palette.background.buy,
        color: theme.palette.text.onPrimary,
      },
    },

    error: {
      iconTheme: {
        backgroundColor: alpha(theme.palette.background.sell!, 0.1),
        color: theme.palette.background.sell,
      },
      acceptTheme: {
        backgroundColor: theme.palette.background.sell,
        color: theme.palette.text.onPrimary,
      },
    },
  } satisfies Record<string, ConfirmDialogThemeReturn>;

  return styles[color] || styles.primary;
}

export default confirmDialogTheme;
