"use client";
import { styled, Typography } from "@mui/material";

const BulletListTitle = styled(Typography)(({ theme }) => {
  const { typography, palette } = theme;
  return {
    color: palette.text.onPrimary,
    fontSize: typography.body1.fontSize,
    fontFamily: typography.body1.fontFamily,
    lineHeight: typography.body1.lineHeight,
  };
});

export default BulletListTitle;
