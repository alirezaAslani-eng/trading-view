import {
  ListItemShapeSizeProps,
  ListItemShapeThemeProps,
} from "@/packages/mui/theme/variants/types";
import { BoxProps } from "@mui/material";

// * -----start----- ListItemShape.tsx -------------
interface ListItemShapeProps extends Omit<BoxProps, "size" | "color"> {
  color?: ListItemShapeThemeProps["color"];
  size?: ListItemShapeSizeProps["size"];
}
// * -----end----- ListItemShape.tsx -------------




export type {ListItemShapeProps}