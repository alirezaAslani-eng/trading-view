import type { BoxProps, MenuProps } from "@mui/material";
import { SelectDisplayProps } from "./dropdownButton.types";
import { ReactNode } from "react";

// * -------start------- InputText.tsx --------------
interface SharedInputTextProps {
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

type InputProps = SharedInputTextProps &
  StyledInputTextProps &
  Omit<BoxProps<"input">, "size" | "color" | "variant"> & {
    textarea?: false;
  };

type TextareaProps = SharedInputTextProps &
  StyledInputTextProps &
  Omit<BoxProps<"textarea">, "size" | "color" | "variant"> & {
    textarea?: true;
  };

type InputTextProps = InputProps | TextareaProps;
// * -------end------- InputText.tsx --------------

// * -------start------- InputSelect.tsx --------------
interface InputSelectProps extends SelectDisplayProps {
  placeholder?: ReactNode;
  onChange?: (value: string) => void;
  value?: string;
}
// * -------end------- InputSelect.tsx --------------

// * -------start------- InputSelectMenu.tsx --------------
interface InputSelectMenuProps extends Omit<
  MenuProps,
  "anchorEl" | "open" | "onClose"
> {}
// * -------end------- InputSelectMenu.tsx --------------

// * -------start------- InputSelectItem.tsx --------------
interface InputSelectItemProps extends BoxProps {
  value: string;
}
// * -------end------- InputSelectItem.tsx --------------

// * -------start------- InputVerifyCode.tsx --------------
interface InputVerifyCodeProps extends Pick<BoxProps, "sx"> {
  onComplete?: (value: string) => void;
  error?: boolean;
}
// * -------end------- InputVerifyCode.tsx --------------

export type {
  InputTextProps,
  StyledInputTextProps,
  InputSelectProps,
  InputSelectMenuProps,
  InputSelectItemProps,
  InputVerifyCodeProps,
};
