import type { BoxProps } from "@mui/material";
import { InputSizeProps, InputThemeProps } from "../shared/input";

// * -------start------- InputText.tsx --------------
interface BaseInputProps {
  error?: boolean;
}

interface StyledInputTextProps {
  variant?: InputThemeProps["variant"];
  size?: InputSizeProps["size"];
  color?: InputThemeProps["color"];
}

type InputProps = BaseInputProps &
  StyledInputTextProps &
  Omit<BoxProps<"input">, "size" | "color" | "variant"> & {
    textarea?: false;
  };

type TextareaProps = BaseInputProps &
  StyledInputTextProps &
  Omit<BoxProps<"textarea">, "size" | "color" | "variant"> & {
    textarea?: true;
  };

type InputTextProps = InputProps & { textarea?: boolean };
// * -------end------- InputText.tsx --------------

// * ------start-------- StyledSelectDisplay.tsx ------------
type BaseSelectDisplayProps = Partial<
  Omit<BoxProps, "onChange" | "value"> &
    Record<"focused" | "isSelected" | "error", boolean>
>;

interface SelectDisplayProps extends BaseSelectDisplayProps {
  variant?: InputThemeProps["variant"];
  color?: InputThemeProps["color"];
  size?: InputSizeProps["size"];
  disabled?: boolean;
}
// * ------end-------- StyledSelectDisplay.tsx ------------

export type {
  InputTextProps,
  StyledInputTextProps,
  SelectDisplayProps,
  InputProps,
  TextareaProps,
  BaseInputProps,
};
