"use client";
import { Box, styled } from "@mui/material";

const TradePanelPaper = styled(Box)(({ theme: { palette } }) => ({
  borderRadius: "16px",
  border: "1px solid",
  borderColor: palette.border.dark,
  backgroundColor: palette.background.surfaceLevel5,
}));

export default TradePanelPaper;
