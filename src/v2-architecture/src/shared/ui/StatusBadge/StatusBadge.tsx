"use client";
import { Box, styled, BoxProps } from "@mui/material";
import {
  statusBadgeSize,
  statusBadgeTheme,
  StatusBadgeSizeProps,
  StatusBadgeThemeProps,
} from "./styles";

interface StyledStatusBadgeProps extends Omit<
  BoxProps<"div">,
  "color" | "size"
> {
  color?: StatusBadgeThemeProps["color"];
  size?: StatusBadgeSizeProps["size"];
}

const statusBadgeDefaults = {
  size: "medium",
  color: "success",
} as const;

const StatusBadge = styled(Box)<StyledStatusBadgeProps>(({
  theme,
  size = statusBadgeDefaults.size,
  color = statusBadgeDefaults.color,
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
