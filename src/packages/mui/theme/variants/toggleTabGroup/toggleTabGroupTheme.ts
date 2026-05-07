import { ToggleTabGroupThemeProps, ToggleTabGroupThemeReturns } from "../types";

function toggleTabGroupTheme({
  theme,
  color,
  variant,
}: ToggleTabGroupThemeProps): ToggleTabGroupThemeReturns {
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
      } satisfies ToggleTabGroupThemeReturns,
    },
  };

  return styles?.[color]?.[variant] || styles.nuteral.contained;
}

export default toggleTabGroupTheme;
