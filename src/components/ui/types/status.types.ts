import type { BoxProps } from "@mui/material";
import {
  StatusBadgeSizeProps,
  StatusBadgeThemeProps,
} from "@/packages/mui/theme/variants/types";

// * ------start------ StatusBadge.tsx ---------------
interface StyledStatusBadgeProps extends Omit<
  BoxProps<"div">,
  "color" | "size"
> {
  color?: StatusBadgeThemeProps["color"];
  size?: StatusBadgeSizeProps["size"];
}
// * ------end------ StatusBadge.tsx ---------------

export type { StyledStatusBadgeProps };
