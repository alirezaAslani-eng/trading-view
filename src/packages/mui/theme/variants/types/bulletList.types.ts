import { CSSProperties, Theme } from "@mui/material";

interface BulletListThemeProps {
  theme: Theme;
  variant: "contained" | "standard";
  color: "disabled" | "primary" | "warning";
}
interface BulletListThemeReturn {
  rootTheme: CSSProperties;
}

export type { BulletListThemeProps, BulletListThemeReturn };
