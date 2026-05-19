"use client";
import {
  buttonSize,
  buttonTheme,
  defaultButtonVariants,
} from "@/packages/mui/theme/variants";
import buttonDisabledTheme from "@/packages/mui/theme/variants/button/buttonDisabledTheme";
import { Button as MuiButton, styled } from "@mui/material";

const Button = styled(MuiButton)(({
  theme,
  color = defaultButtonVariants.color,
  variant = defaultButtonVariants.variant,
  size = defaultButtonVariants.size,
}) => {
  const button_theme = buttonTheme({ color, theme, variant });
  const button_size = buttonSize({ size, theme });
  const button_disabled = buttonDisabledTheme({ theme, variant });
  return {
    ...button_size.rootSize,
    ...button_theme.rootTheme,
    "&.Mui-disabled": {
      ...button_disabled.rootTheme,
    },
  };
});

export default Button;
