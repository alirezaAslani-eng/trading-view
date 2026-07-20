import type { CheckboxSizeProps, CheckboxThemeProps } from "./styles";
import type { CheckboxProps as MuiCheckboxProps } from "@mui/material";

// * -------start------CheckboxProps.tsx-----------
interface CheckboxProps extends Omit<
  MuiCheckboxProps,
  "color" | "size" | "variant"
> {
  color?: CheckboxThemeProps["color"];
  size?: CheckboxSizeProps["size"];
  variant?: CheckboxThemeProps["variant"];
  label?: string;
}
// * -------end------CheckboxProps.tsx-----------

export type { CheckboxProps };
