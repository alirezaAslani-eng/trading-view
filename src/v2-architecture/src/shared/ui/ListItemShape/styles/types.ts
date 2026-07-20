import { CSSProperties, Theme } from "@mui/material";

type ListItemShapeColors = "disabled" | "primary" | "warning";
type ListItemShapeSizes = "small";

// * -----start------ ListItemShapeSize.ts --------------
interface ListItemShapeSizeProps {
  size: ListItemShapeSizes;
}
interface ListItemShapeSizeReturn {
  rootSize: CSSProperties;
}
// * -----end------ ListItemShapeSize.ts --------------

// * -----start------ ListItemShapeTheme.ts --------------
interface ListItemShapeThemeProps {
  color: ListItemShapeColors;
  theme: Theme;
}
interface ListItemShapeThemeReturn {
  rootTheme: CSSProperties;
}
// * -----end------ ListItemShapeTheme.ts --------------

export type {
  ListItemShapeSizeProps,
  ListItemShapeSizeReturn,
  ListItemShapeThemeProps,
  ListItemShapeThemeReturn,
};
