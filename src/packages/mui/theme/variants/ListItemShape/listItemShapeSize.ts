import {
  ListItemShapeSizeReturn,
  ListItemShapeSizeProps,
} from "@/packages/mui/theme/variants/types";

/**
 * @returns {{rootSize:object}}
 */
function listItemShapeSize({
  size,
}: ListItemShapeSizeProps): ListItemShapeSizeReturn {
  const sizes = {
    small: {
      rootSize: {
        width: "6px",
        flexShrink: "0",
        outlineWidth: "2px",
      },
    } satisfies ListItemShapeSizeReturn,
  };

  return sizes?.[size] || sizes.small;
}

export default listItemShapeSize;
