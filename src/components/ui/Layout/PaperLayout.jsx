"use client";
import { Box, styled, Typography } from "@mui/material";
import PanelPaper from "@/components/ui/Paper/PanelPaper";

const PagePaper = styled(PanelPaper)({
  padding: "20px 16px",
  width: "100%",
  height: "100%",
});

const PagePaperHeading = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const PagePaperTitle = styled(Typography)(({ theme }) => {
  const { palette, typography } = theme;
  return {
    color: palette.text.heading,
    fontSize: typography.h7.fontSize,
    fontFamily: typography.h7.fontFamily,
    lineHeight: typography.h7.lineHeight,
  };
});

export { PagePaper, PagePaperTitle, PagePaperHeading };
