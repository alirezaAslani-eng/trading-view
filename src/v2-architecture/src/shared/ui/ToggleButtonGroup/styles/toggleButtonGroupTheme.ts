import {
  ToggleButtonGroupThemeProps,
  ToggleButtonGroupThemeReturn,
} from "./types";

function toggleButtonGroupTheme({
  theme,
  color,
  variant,
}: ToggleButtonGroupThemeProps): ToggleButtonGroupThemeReturn {
  const styles = {
    primary: {
      contained: {
        rootTheme: {},
        selected: {
          backgroundColor: `${theme.palette.background.primary} !important`,
          color: `${theme.palette.text.onPrimary} !important`,
        },
        notSelected: {
          background: `transparent !important`,
          color: theme.palette.text.onPrimary,
        },
      } satisfies ToggleButtonGroupThemeReturn,
    },
    success: {
      contained: {
        rootTheme: {
          backgroundColor: theme.palette.background.surface,
        },
        notSelected: {
          backgroundColor: "transparent",
          color: theme.palette.text.disabled,
        },
        selected: {
          backgroundColor: `${theme.palette.background.buy} !important`,
          color: `${theme.palette.text.onPrimary} !important`,
        },
      } satisfies ToggleButtonGroupThemeReturn,
    },
    nuteral: {
      contained: {
        rootTheme: {
          backgroundColor: theme.palette.background.surface,
        },
        notSelected: {
          backgroundColor: `transparent`,
          color: theme.palette.text.linkSecondary,
        },
        selected: {
          backgroundColor: `${theme.palette.background.toggleActive} !important`,
          color: theme.palette.text.onPrimary,
        },
      } satisfies ToggleButtonGroupThemeReturn,
    },
  };

  return styles?.[color]?.[variant] || styles.primary.contained;
}

export default toggleButtonGroupTheme;
