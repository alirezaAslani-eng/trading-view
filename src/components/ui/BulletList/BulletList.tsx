"use client";
import { Box, styled } from "@mui/material";
import { StyledBulletListProps } from "@/components/ui/types";
import {
  bulletListTheme,
  defaultBulletListVariants,
} from "@/packages/mui/theme/variants";

const BulletList = styled(Box)<StyledBulletListProps>(({
  theme,
  color = defaultBulletListVariants.color,
  variant = defaultBulletListVariants.variant,
}) => {
  const { rootTheme } = bulletListTheme({ color, theme, variant });
  return {
    padding: "20px 16px",
    ...rootTheme,
  };
});

export default BulletList;
