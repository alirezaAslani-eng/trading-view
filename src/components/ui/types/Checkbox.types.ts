import {
  CheckboxSizeProps,
  CheckboxThemeProps,
} from "@/packages/mui/theme/variants/types";
import type { CheckboxProps as MuiCheckboxProps } from "@mui/material";

// * -------start------CheckBoxProps.tsx-----------
interface CheckBoxProps extends MuiCheckboxProps {
  color?: CheckboxThemeProps["color"];
  size?: CheckboxSizeProps["size"];
  variant?: CheckboxThemeProps["variant"];
  label?:string
}
// * -------end------CheckBoxProps.tsx-----------

export type { CheckBoxProps };
