"use client";
import { styled, Box, BoxProps } from "@mui/material";
import { listItemShapeSize, listItemShapeTheme } from "./styles";
import { ListItemShapeSizeProps, ListItemShapeThemeProps } from "./styles";

interface ListItemShapeStyledProps extends Omit<BoxProps, "size" | "color"> {
  color?: ListItemShapeThemeProps["color"];
  size?: ListItemShapeSizeProps["size"];
}

const listItemShapeDefaults = {
  size: "small",
  color: "disabled",
} as const;

const ListItemShape = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "color" && prop !== "size";
  },
})<ListItemShapeStyledProps>(({
  theme,
  size = listItemShapeDefaults.size,
  color = listItemShapeDefaults.color,
}) => {
  const listItemShape_theme = listItemShapeTheme({ color, theme });
  const listItemShape_size = listItemShapeSize({ size });
  return {
    outlineStyle: "solid",
    aspectRatio: "1/1",
    borderRadius: "999px",
    height: "fit-content",
    ...listItemShape_theme?.rootTheme,
    ...listItemShape_size?.rootSize,
  };
});

export default ListItemShape;
