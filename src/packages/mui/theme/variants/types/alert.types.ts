import type { CSSProperties, Theme } from "@mui/material";

// * -----start----- alertSize.ts ----------
interface AlertSizeProps {
  theme: Theme;
  size: "small";
}
interface AlertSizeReturn {
  rootSize: CSSProperties;
  iconSize: CSSProperties;
}
// * -----end----- alertSize.ts ----------

// * -----start----- alertTheme.ts ----------
interface AlertThemeProps {
  theme: Theme;
  variant: "standard";
  color: "warning";
}
interface AlertThemeReturn {
  rootTheme: CSSProperties;
  iconTheme: CSSProperties;
}
// * -----end----- alertTheme.ts ----------

export type {
  AlertSizeProps,
  AlertSizeReturn,
  AlertThemeProps,
  AlertThemeReturn,
};
