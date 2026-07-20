import type { CSSProperties, Theme } from "@mui/material";
type AlertSizes = "small";
type AlertColors = "warning";
type AlertVariants = "standard";

// * -----start----- alertSize.ts ----------
interface AlertSizeProps {
  theme: Theme;
  size: AlertSizes;
}
interface AlertSizeReturn {
  rootSize: CSSProperties;
  iconSize: CSSProperties;
}
// * -----end----- alertSize.ts ----------

// * -----start----- alertTheme.ts ----------
interface AlertThemeProps {
  theme: Theme;
  variant: AlertVariants;
  color: AlertColors;
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
