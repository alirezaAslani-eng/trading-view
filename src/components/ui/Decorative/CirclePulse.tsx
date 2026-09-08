"use client";

import { styled,Box } from "@mui/material";

interface StyledCirclePulseProps {
  first?: boolean;
}

const CirclePulse = styled(Box, {
  shouldForwardProp: (prop) => prop !== "first",
})<StyledCirclePulseProps>(({ theme, first }) => ({
  width: "100%",
  aspectRatio: "1 / 1",
  borderRadius: "999px",
  border: "1px solid",
  borderColor: theme.palette.background.input,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  ...(first && {
    position: "absolute",
    inset: 0,
    zIndex: -1,
  }),
}));

export default CirclePulse;
