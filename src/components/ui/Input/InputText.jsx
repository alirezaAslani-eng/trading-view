"use client";
import { inputSize, inputTheme } from "@/packages/mui/theme/style-generator";
import { styled } from "@mui/material";

const StyledInputText = styled("input", {
  shouldForwardProp: (p) => {
    return p !== "variant" && p !== "color" && p !== "size" && p !== "error";
  },
})(({
  theme,
  color = "primary",
  size = "medium",
  variant = "contained",
  error,
}) => {
  const input_size = inputSize({ theme, size });

  const input_theme = inputTheme({
    theme,
    color,
    variant,
    error,
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
    ...input_theme?.errorTheme,
  };
});

/**
 * @param {{variant:string; size:string; color:string} & import("react").ComponentProps<typeof StyledInputText>} props
 */
function InputText(props) {
  return <StyledInputText {...props} />;
}
export default InputText;
