import {
  ToggleTabGroupSizeProps,
  ToggleTabGroupThemeProps,
} from "@/packages/mui/theme/variants/types";
import { ToggleButtonGroupProps } from "@mui/material";

// * ------start------ ToggleTabGroup.tsx -------------
interface StyledToggleTabGroupProps extends Omit<
  ToggleButtonGroupProps,
  "color" | "variant" | "size"
> {
  color?: ToggleTabGroupThemeProps["color"];
  variant?: ToggleTabGroupThemeProps["variant"];
  size?: ToggleTabGroupSizeProps["size"];
}
// * ------end------ ToggleTabGroup.tsx -------------

export type { StyledToggleTabGroupProps };
