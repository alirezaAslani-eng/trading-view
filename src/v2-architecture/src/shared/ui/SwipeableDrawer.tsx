"use client";

import Box from "@mui/material/Box";
import _SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";

export const SwipeableDrawer = styled(_SwipeableDrawer)({
  "& .MuiDrawer-paper": {
    backgroundColor: "transparent",
    padding: 0,
    boxShadow: "none",
    border: "none",
  },
});
