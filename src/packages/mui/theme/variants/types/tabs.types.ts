import { CSSProperties, Theme } from "@mui/material";

// * ----start-----tabsTheme.ts--------
interface TabsThemeProps {
  appearance: "standard";
  color: "primary";
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
  size: "medium" | "small";
  theme: Theme;
}
interface TabsSizeReturn {
  rootSize: CSSProperties;
  tabSize: CSSProperties;
  indicatorSize: CSSProperties;
}
// * ----end-----tabsSize.ts--------

export type { TabsThemeProps, TabsThemeReturn, TabsSizeProps, TabsSizeReturn };
