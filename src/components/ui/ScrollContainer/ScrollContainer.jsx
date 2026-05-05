"use client";
import { nuteralScrollbar } from "@/packages/mui/theme/shared-style";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
const ScrollContainer = styled(Box)(({ theme }) => {
  return {
    overflow: "auto",
    ...nuteralScrollbar(theme),
  };
});

export default ScrollContainer;
