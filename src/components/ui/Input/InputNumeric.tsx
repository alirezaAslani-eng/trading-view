"use client";
import { styled } from "@mui/material";
import { BaseInputProps, StyledInputTextProps } from "../types";
import { NumericFormat } from "react-number-format";
import { ComponentProps } from "react";
import {
  inputDefaultVariants,
  inputDisabled,
  inputSize,
  inputTheme,
} from "@/packages/mui/theme/variants";
import { InputSizeProps } from "@/packages/mui/theme/variants/types";
import clsx from "clsx";

const StyledNumericFormat = styled(NumericFormat, {
  shouldForwardProp: (p): boolean => {
    return p !== "variant" && p !== "color" && p !== "scale" && p !== "error";
  },
})<Omit<StyledInputTextProps, "size"> & { scale?: InputSizeProps["size"] }>(({
  theme,
  color = inputDefaultVariants.color,
  scale = inputDefaultVariants.size,
  variant = inputDefaultVariants.variant,
}) => {
  const input_size = inputSize({ theme, size: scale });
  const input_theme = inputTheme({ theme, color, variant });
  const disabled_theme = inputDisabled({ theme, color, variant });

  return {
    outline: "none",
    width: "100%",
    direction: "ltr", // * Only number
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
  };
});

function InputNumeric({
  error,
  ...props
}: ComponentProps<typeof StyledNumericFormat> & BaseInputProps) {
  return (
    <StyledNumericFormat
      thousandSeparator
      {...props}
      className={clsx(
        {
          "Mui-error": error,
          "Mui-disabled": props.disabled,
        },
        props.className,
      )}
    />
  );
}
export default InputNumeric;

<NumericFormat />;
