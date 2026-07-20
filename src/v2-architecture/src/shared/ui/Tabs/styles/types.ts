import { CSSProperties, Theme } from "@mui/material";

type TabsAppearance = "standard";
type TabsColors = "primary";
type TabsSizes = "medium" | "small";

// * ----start-----tabsTheme.ts--------
interface TabsThemeProps {
  appearance: TabsAppearance;
  color: TabsColors;
  theme: Theme;
}
interface TabsThemeReturn {
  rootTheme: CSSProperties;
  tabTheme: CSSProperties;
  tabSelectedTheme: CSSProperties;
  indicatorTheme: CSSProperties;
}
// * ----end-----tabsTheme.ts--------

// * ----start-----tabsSize.ts--------
interface TabsSizeProps {
  size: TabsSizes;
  theme: Theme;
}
interface TabsSizeReturn {
  rootSize: CSSProperties;
  tabSize: CSSProperties;
  indicatorSize: CSSProperties;
}
// * ----end-----tabsSize.ts--------

export type { TabsThemeProps, TabsThemeReturn, TabsSizeProps, TabsSizeReturn };
