"use client";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import {
  listItemShapeSize,
  listItemShapeTheme,
} from "@/packages/mui/theme/variants";

const StyledListItemShape = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "color" || prop !== "size";
  },
})(({ theme, size, color }) => {
  const listItemShape_theme = listItemShapeTheme({ color, theme });
  const listItemShape_size = listItemShapeSize({ size });
  return {
    outlineStyle: "solid",
    aspectRatio: "1/1",
    borderRadius: "999px",
    ...listItemShape_theme?.rootTheme,
    ...listItemShape_size?.rootSize,
  };
});

/**
 * @param {{color:string, size:string} & import("react").ComponentProps<typeof StyledListItemShape>} props
 */
function ListItemShape(props) {
  return <StyledListItemShape {...props} />;
}
export default ListItemShape;
