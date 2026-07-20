"use client";
import { styled, Box } from "@mui/material";
import { ComponentProps } from "react";

const StyledCirclePulse = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "first";
  },
})<{ first: boolean }>(({ theme, first }) => {
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

function CirclePulse(props: ComponentProps<typeof StyledCirclePulse>) {
  return <StyledCirclePulse {...props} />;
}
export default CirclePulse;
