"use client";
import { alpha, Box, styled } from "@mui/material";
const backdropFilter = "blur(10px)";
const StyledPanelPaper = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "fullWidth";
  },
})(({ theme, fullWidth }) => ({
  borderRadius: "16px",
  width: fullWidth ? "100%" : "fit-content",
  backgroundColor: alpha(theme.palette.background.paper, 0.08),
  WebkitBackdropFilter: backdropFilter,
  backdropFilter,
}));

/**
 * @param {React.ComponentProps<typeof StyledPanelPaper> & {fullWidth:boolean}} props
 */

function PanelPaper(props) {
  return <StyledPanelPaper {...props} />;
}
export default PanelPaper;
