import { styled } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const StyledCirclePulse = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "first";
  },
})(({ theme, first }) => {
  return {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: "999px",
    border: "1px solid",
    borderColor: theme.palette.background.input,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...(first && { position: "absolute", inset: "0", zIndex: -1 }),
  };
});
/**
 * @param {React.ComponentProps<typeof StyledCirclePulse> & {first:boolean}} props
 */
function CirclePulse(props) {
  return <StyledCirclePulse {...props} />;
}
export default CirclePulse;
