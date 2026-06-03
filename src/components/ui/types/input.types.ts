import type { BoxProps, MenuProps, Theme } from "@mui/material";
import { SelectDisplayProps } from "./dropdownButton.types";
import { ReactNode } from "react";
import type { SystemStyleObject } from "@mui/system";
import type { SelectValue } from "@/context/app/InputSelectController/types";
import {
  InputSizeProps,
  InputThemeProps,
} from "@/packages/mui/theme/variants/types";

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

type InputTextProps = InputProps | TextareaProps;
// * -------end------- InputText.tsx --------------

// * -------start------- InputSelect.tsx --------------
interface InputSelectProps extends SelectDisplayProps {
  placeholder?: ReactNode;
  onChange?: (value: SelectValue) => void;
  value?: SelectValue;
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
  value: SelectValue;
}
// * -------end------- InputSelectItem.tsx --------------

// * -------start------- InputVerifyCode.tsx --------------
interface InputVerifyCodeProps extends Pick<BoxProps, "sx"> {
  onComplete?: (value: string) => void;
  error?: boolean;
}
// * -------end------- InputVerifyCode.tsx --------------

// * -------start------- InputPhoneNumber.tsx --------------
interface InputPhoneNumberProps extends Omit<InputProps, "sx"> {
  sx?: SystemStyleObject<Theme>;
  countryCode?: boolean;
}
// * -------end------- InputPhoneNumber.tsx --------------

export type {
  InputTextProps,
  StyledInputTextProps,
  InputSelectProps,
  InputSelectMenuProps,
  InputSelectItemProps,
  InputVerifyCodeProps,
  InputProps,
  TextareaProps,
  InputPhoneNumberProps,
  BaseInputProps,
};
