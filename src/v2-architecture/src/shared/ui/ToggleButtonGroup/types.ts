import { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from "@mui/material";
import {
  ToggleButtonGroupSizeProps,
  ToggleButtonGroupThemeProps,
} from "./styles";
// * ------start------ ToggleButtonGroup.tsx -------------
type ToggleButtonGroupPropsOmitedProps = Omit<
  MuiToggleButtonGroupProps,
  "color" | "variant" | "size"
>;
interface ToggleButtonGroupProps extends ToggleButtonGroupPropsOmitedProps {
  color?: ToggleButtonGroupThemeProps["color"];
  variant?: ToggleButtonGroupThemeProps["variant"];
  size?: ToggleButtonGroupSizeProps["size"];
}
// * ------end------ ToggleButtonGroup.tsx -------------

export type { ToggleButtonGroupProps };
