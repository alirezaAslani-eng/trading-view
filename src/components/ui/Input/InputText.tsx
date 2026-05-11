"use client";
import {
  inputDefaultVariants,
  inputSize,
  inputTheme,
  textareaSize,
} from "@/packages/mui/theme/variants";
import { Box, styled } from "@mui/material";
import clsx from "clsx";
import { InputTextProps, StyledInputTextProps } from "../types";
import { ComponentProps } from "react";

const StyledInputText = styled(Box, {
  shouldForwardProp: (p): boolean => {
    return p !== "variant" && p !== "color" && p !== "size" && p !== "error";
  },
})<StyledInputTextProps>(({
  theme,
  color = inputDefaultVariants.color,
  size = inputDefaultVariants.size,
  variant = inputDefaultVariants.variant,
}) => {
  const input_size = inputSize({ theme, size });
  const textarea_size = textareaSize({ size });
  const input_theme = inputTheme({
    theme,
    color,
    variant,
  });

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
    "&.Mui-textarea": {
      ...textarea_size.rootSize,
    },
  };
});

function InputText({ textarea, error, ...props }: InputTextProps) {
  return (
    <StyledInputText
      {...props}
      // @ts-ignore
      component={textarea ? "textarea" : "input"}
      className={clsx(
        { "Mui-error": error, "Mui-textarea": textarea },
        props.className,
      )}
    />
  );
}
export default InputText;
