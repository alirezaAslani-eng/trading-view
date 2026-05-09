import { CSSProperties, Theme } from "@mui/material";

// * -----start------ ListItemShapeSize.ts --------------
interface ListItemShapeSizeProps {
  size: "small";
}
interface ListItemShapeSizeReturn {
  rootSize: CSSProperties;
}
// * -----end------ ListItemShapeSize.ts --------------

// * -----start------ ListItemShapeTheme.ts --------------
interface ListItemShapeThemeProps {
  color: "disabled" | "primary";
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
