import {
  ToggleButtonGroupSizeProps,
  ToggleButtonGroupThemeProps,
  ToggleTabGroupSizeProps,
  ToggleTabGroupThemeProps,
} from "@/packages/mui/theme/variants/types";
import { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from "@mui/material";

type ToggleButtonGroupPropsOmitedVariants = Omit<
  MuiToggleButtonGroupProps,
  "color" | "variant" | "size"
>;

// * ------start------ ToggleTabGroup.tsx -------------
interface StyledToggleTabGroupProps extends ToggleButtonGroupPropsOmitedVariants {
  color?: ToggleTabGroupThemeProps["color"];
  variant?: ToggleTabGroupThemeProps["variant"];
  size?: ToggleTabGroupSizeProps["size"];
}
// * ------end------ ToggleTabGroup.tsx -------------

// * ------start------ ToggleButtonGroup.tsx -------------
interface ToggleButtonGroupProps extends ToggleButtonGroupPropsOmitedVariants {
  color?: ToggleButtonGroupThemeProps["color"];
  variant?: ToggleButtonGroupThemeProps["variant"];
  size?: ToggleButtonGroupSizeProps["size"];
}
// * ------end------ ToggleButtonGroup.tsx -------------

export type { StyledToggleTabGroupProps, ToggleButtonGroupProps };
