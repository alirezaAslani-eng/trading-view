import { TabsThemeProps, TabsThemeReturn } from "../types";

function tabsTheme({
  color,
  appearance,
  theme,
}: TabsThemeProps): TabsThemeReturn {
  const { palette } = theme;
  const styles = {
    primary: {
      standard: {
        rootTheme: {
          borderColor: palette.border.default,
          borderStyle: "solid",
        },
        tabTheme: {
          color: palette.text.linkSecondary,
        },
        tabSelectedTheme: {
          color: palette.text.onPrimary,
        },
        indicatorTheme: {
          color: palette.border.primary,
        },
      } satisfies TabsThemeReturn,
    },
  };

  return styles?.[color]?.[appearance] || styles.primary.standard;
}

export default tabsTheme;
