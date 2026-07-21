"use client";
import {
  inputDefaultVariants,
  inputDisabled,
  inputSize,
  inputTheme,
  textareaSize,
} from "@/packages/mui/theme/variants";
import { Box, styled, useFormControl } from "@mui/material";
import clsx from "clsx";
import { InputTextProps, StyledInputTextProps } from "../types";

const StyledInputText = styled(Box, {
  shouldForwardProp: (p): boolean => {
    return p !== "variant" && p !== "color" && p !== "size" && p !== "error";
  },
})<StyledInputTextProps>(
  ({
    theme,
    color = inputDefaultVariants.color,
    size = inputDefaultVariants.size,
    variant = inputDefaultVariants.variant,
  }) => {
    const input_size = inputSize({ theme, size });
    const textarea_size = textareaSize({ size });
    const disabled_theme = inputDisabled({ theme, color, variant });
    const input_theme = inputTheme({ theme, color, variant });

    return {
      outline: "none",
      width: "100%",
      ...input_theme.rootTheme,
      ...input_size.rootSize,
      "::placeholder": {
        ...input_theme.placeholderTheme,
        ...input_size.placeholderSize,
      },

      ":focus": { ...input_theme.focusTheme },

      "&.Mui-error": {
        ...input_theme.errorTheme,
      },
      "&.Mui-disabled": {
        ...disabled_theme.rootTheme,
        "::placeholder": {
          ...disabled_theme.placeholderTheme,
        },
      },
      "&.Mui-textarea": {
        ...textarea_size.rootSize,
      },
    };
  }
);

function InputText({ textarea, error, ...props }: InputTextProps) {
  const formState = useFormControl();
  const disabled = props.disabled || formState?.disabled;
  return (
    <StyledInputText
      {...props}
      className={clsx(
        {
          "Mui-error": error,
          "Mui-textarea": textarea,
          "Mui-disabled": disabled,
        },
        props.className
      )}
      // @ts-ignore
      disabled={disabled}
      component={textarea ? "textarea" : "input"}
    />
  );
}
export default InputText;
