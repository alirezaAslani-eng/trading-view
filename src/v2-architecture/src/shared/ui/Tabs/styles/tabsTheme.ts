import { TabsThemeProps, TabsThemeReturn } from "./types";

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
          borderColor: `${palette.border.default} !important`,
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
  const style = styles?.[color]?.[appearance] as TabsThemeReturn | undefined;
  return style || styles.primary.standard;
}

export default tabsTheme;
