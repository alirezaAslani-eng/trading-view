import { Theme } from "@mui/material";
import { CSSProperties } from "@mui/material/styles";

// * -----start------ statusBadgeSize.ts -------------
interface StatusBadgeSizeProps {
  size: "medium";
  theme: Theme;
}
interface StatusBadgeSizeReturn {
  rootSize: CSSProperties;
  iconSize: CSSProperties;
}
// * -----end------ statusBadgeSize.ts -------------

// * -----start------ statusBadgeTheme.ts -------------
interface StatusBadgeThemeProps {
  color: "warning" | "success" | "error" | "disabled";
  theme: Theme;
}
interface StatusBadgeThemeReturn {
  rootTheme: CSSProperties;
  iconTheme: CSSProperties;
}
// * -----end------ statusBadgeTheme.ts -------------

export type {
  StatusBadgeSizeProps,
  StatusBadgeSizeReturn,
  StatusBadgeThemeProps,
  StatusBadgeThemeReturn,
};
