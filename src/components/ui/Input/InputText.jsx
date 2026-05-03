"use client";
import {
  inputDefaultVariants,
  inputSize,
  inputTheme,
  textareaSize,
} from "@/packages/mui/theme/variants";
import { Box, styled } from "@mui/material";
import clsx from "clsx";

const StyledInputText = styled(Box, {
  shouldForwardProp: (p) => {
    return p !== "variant" && p !== "color" && p !== "size" && p !== "error";
  },
})(({
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
    ...input_theme?.rootTheme,
    ...input_size?.rootSize,
    "::placeholder": {
      ...input_theme?.placeholderTheme,
      ...input_size?.placeholderSize,
    },

    ":focus": { ...input_theme?.focusTheme },

    "&.Mui-error": {
      ...input_theme?.errorTheme,
    },
    "&.Mui-textarea": {
      ...textarea_size?.rootSize,
    },
  };
});

/**
 * @param {{variant:string; size:string; color:string,textarea:boolean} & import("react").ComponentProps<typeof StyledInputText>} props
 */
function InputText({ textarea, ...props }) {
  return (
    <StyledInputText
      {...props}
      component={textarea ? "textarea" : "input"}
      className={clsx(
        { "Mui-error": props?.error, "Mui-textarea": textarea },
        props.className,
      )}
    />
  );
}
export default InputText;
