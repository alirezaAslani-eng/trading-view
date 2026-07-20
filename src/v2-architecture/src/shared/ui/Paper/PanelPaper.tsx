"use client";
import { alpha, Box, styled, BoxProps } from "@mui/material";
const backdropFilter = "blur(10px)";
const StyledPanelPaper = styled(Box)(({ theme, fullWidth }) => ({
  borderRadius: "16px",
  width: "fit-content",
  backgroundColor: alpha(theme.palette.background.paper, 0.08),
  WebkitBackdropFilter: backdropFilter,
  backdropFilter,
}));

function PanelPaper(props: BoxProps) {
  return <StyledPanelPaper {...props} />;
}
export default PanelPaper;
