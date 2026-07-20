"use client";
import { buttonSize, buttonTheme, buttonDisabledTheme } from "./styles";
import { Button as MuiButton, styled } from "@mui/material";

const buttonDefault = {
  variant: "contained",
  color: "primary",
  size: "medium",
} as const;

const Button = styled(MuiButton)(({
  theme,
  color = buttonDefault.color,
  variant = buttonDefault.variant,
  size = buttonDefault.size,
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
