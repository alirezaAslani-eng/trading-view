import { BoxProps } from "@mui/material";
import {
  InputSizeProps,
  InputThemeProps,
} from "@/v2-architecture/src/shared/ui/shared/input";

// * ------start-------- StyledSelectDisplay.tsx ------------
type _SelectDisplayProps = Partial<
  Omit<BoxProps, "onChange" | "value"> &
    Record<"focused" | "isSelected" | "error", boolean>
>;

export interface SelectDisplayProps extends _SelectDisplayProps {
  variant?: InputThemeProps["variant"];
  color?: InputThemeProps["color"];
  size?: InputSizeProps["size"];
  disabled?: boolean;
}
// * ------end-------- StyledSelectDisplay.tsx ------------
