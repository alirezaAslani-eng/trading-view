"use client";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { ListItemShapeProps } from "@/components/ui/types";
import {
  defaultListItemShapeVariants,
  listItemShapeSize,
  listItemShapeTheme,
} from "@/packages/mui/theme/variants";

const ListItemShape = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "color" && prop !== "size";
  },
})<ListItemShapeProps>(({
  theme,
  size = defaultListItemShapeVariants.size,
  color = defaultListItemShapeVariants.color,
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
