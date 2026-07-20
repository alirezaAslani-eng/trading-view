import { ToggleTabGroupThemeProps, ToggleTabGroupThemeReturn } from "./types";

function toggleTabGroupTheme({
  theme,
  color,
  variant,
}: ToggleTabGroupThemeProps): ToggleTabGroupThemeReturn {
  const styles = {
    nuteral: {
      contained: {
        rootStyle: {
          backgroundColor: theme.palette.background.surface,
        },
        notSelectedTab: {
          backgroundColor: `transparent`,
          color: theme.palette.text.linkTertiary,
        },
        selectedTab: {
          background: `transparent !important`,
          color: `${theme.palette.text.onPrimary} !important`,
        },
        dividerStyle: {
          borderStyle: "solid",
          borderColor: theme.palette.border.default,
        },
      } satisfies ToggleTabGroupThemeReturn,
    },
  };

  return styles?.[color]?.[variant] || styles.nuteral.contained;
}

export default toggleTabGroupTheme;
