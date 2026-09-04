"use client";
import { Box, styled, Typography } from "@mui/material";
import PanelPaper from "@/components/ui/Paper/PanelPaper";

const PagePaper = styled(PanelPaper)(({ theme }) => {
  const { breakpoints } = theme;
  return {
    padding: "20px 12px",
    width: "100%",
    [breakpoints.up("sm")]: {
      padding: "20px 16px",
    },
  };
});

const PagePaperHeading = styled(Box)(({ theme }) => {
  const { breakpoints } = theme;
  return {
    display: "none",
    justifyContent: "space-between",
    alignItems: "center",
    [breakpoints.up("sm")]: {
      display: "flex",
    },
  };
});

const PagePaperTitle = styled(Typography)(({ theme }) => {
  const { palette, typography, breakpoints } = theme;
  return {
    color: palette.text.heading,
    [breakpoints.up("sm")]: {
      ...typography.h7,
    },
  };
});

export { PagePaper, PagePaperTitle, PagePaperHeading };
