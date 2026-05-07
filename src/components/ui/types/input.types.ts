import type { BoxProps } from "@mui/material";

// * -------start------- InputText.tsx --------------

interface BaseInputTextProps {
  error?: boolean;
}

type InputProps = BaseInputTextProps &
  BoxProps<"input"> & {
    textarea?: false;
  };
type TextareaProps = BaseInputTextProps &
  BoxProps<"textarea"> & {
    textarea?: true;
  };

type InputTextProps = InputProps | TextareaProps;

interface StyledInputTextProps {
  variant?: "contained" | "outlined";
  size?: "small" | "medium";
  color?: "primary";
}

// * -------end------- InputText.tsx --------------

export type { InputTextProps, StyledInputTextProps };
