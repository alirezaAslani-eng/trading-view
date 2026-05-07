"use client";
import { Box, styled } from "@mui/material";
import { StyledStatusBadgeProps } from "../types";
import {
  defaultStatusBadgeVariants,
  statusBadgeSize,
  statusBadgeTheme,
} from "@/packages/mui/theme/variants";

const StatusBadge = styled(Box)<StyledStatusBadgeProps>(({
  theme,
  size = defaultStatusBadgeVariants.size,
  color = defaultStatusBadgeVariants.color,
}) => {
  const { iconSize, rootSize } = statusBadgeSize({ size, theme });
  const { iconTheme, rootTheme } = statusBadgeTheme({ theme, color });

  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    whiteSpace: "nowrap",
    ...rootSize,
    ...rootTheme,
    "& .MuiSvgIcon-root": {
      ...iconSize,
      ...iconTheme,
    },
  };
});

export default StatusBadge;
