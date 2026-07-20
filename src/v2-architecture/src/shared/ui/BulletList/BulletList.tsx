"use client";
import { Box, styled } from "@mui/material";
import { bulletListTheme, BulletListThemeProps } from "./styles";

interface StyledBulletListProps {
  color?: BulletListThemeProps["color"];
  variant?: BulletListThemeProps["variant"];
}

const bulletListDefaults = {
  color: "primary",
  variant: "contained",
} as const;

const BulletList = styled(Box)<StyledBulletListProps>(({
  theme,
  color = bulletListDefaults.color,
  variant = bulletListDefaults.variant,
}) => {
  const { rootTheme } = bulletListTheme({ color, theme, variant });
  return {
    padding: "20px 16px",
    ...rootTheme,
  };
});

export default BulletList;
