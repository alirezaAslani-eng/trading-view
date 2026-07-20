import { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from "@mui/material";
import { ToggleTabGroupSizeProps, ToggleTabGroupThemeProps } from "./styles";

type ToggleButtonGroupPropsOmitedVariants = Omit<
  MuiToggleButtonGroupProps,
  "color" | "variant" | "size"
>;

// * ------start------ ToggleTabGroup.tsx -------------
export interface StyledToggleTabGroupProps
  extends ToggleButtonGroupPropsOmitedVariants {
  color?: ToggleTabGroupThemeProps["color"];
  variant?: ToggleTabGroupThemeProps["variant"];
  size?: ToggleTabGroupSizeProps["size"];
}
// * ------end------ ToggleTabGroup.tsx -------------
