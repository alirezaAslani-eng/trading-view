"use client";
import { alpha, Box, styled } from "@mui/material";
const backdropFilter = "blur(10px)";
const StyledPanelPaper = styled(Box)(({ theme, fullWidth }) => ({
  borderRadius: "16px",
  width: "fit-content",
  backgroundColor: alpha(theme.palette.background.paper, 0.08),
  WebkitBackdropFilter: backdropFilter,
  backdropFilter,
}));

/**
 * @param {React.ComponentProps<typeof StyledPanelPaper>} props
 */
function PanelPaper(props) {
  return <StyledPanelPaper {...props} />;
}
export default PanelPaper;
