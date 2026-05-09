import {
  InputSizeProps,
  InputThemeProps,
} from "@/packages/mui/theme/variants/types";
import { BoxProps } from "@mui/material";

// * ------start-------- StyledSelectDisplay.tsx ------------
type _SelectDisplayProps = Partial<
  Omit<BoxProps, "onChange" | "value"> &
    Record<"focused" | "isSelected" | "error", boolean>
>;

interface SelectDisplayProps extends _SelectDisplayProps {
  variant?: InputThemeProps["variant"];
  color?: InputThemeProps["color"];
  size?: InputSizeProps["size"];
}
// * ------end-------- StyledSelectDisplay.tsx ------------

export type { SelectDisplayProps };
