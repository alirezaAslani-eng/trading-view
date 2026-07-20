import { CSSProperties, Theme } from "@mui/material";

type BulletListVariants = "contained" | "standard";
type BulletListColors = "disabled" | "primary" | "warning";

interface BulletListThemeProps {
  theme: Theme;
  variant: BulletListVariants;
  color: BulletListColors;
}
interface BulletListThemeReturn {
  rootTheme: CSSProperties;
}

export type { BulletListThemeProps, BulletListThemeReturn };
