"use client";
import { Box } from "@mui/material";
import { BoxProps, keyframes } from "@mui/system";
import { ComponentProps } from "react";
import {
  ReplaceSxWithSxOnlyObject,
  SxPropOnlyObject,
} from "@/packages/mui/theme/types";
import CircleBox from "../Box/CircleBox";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-30%);
  }
`;

interface BouncCircleLoader extends ReplaceSxWithSxOnlyObject<BoxProps> {
  bounceSx?: SxPropOnlyObject;
}
export default function BouncCircleLoader({
  bounceSx,
  ...props
}: BouncCircleLoader) {
  return (
    <Box {...props} sx={{ display: "flex", gap: 2, ...props.sx }}>
      {[0, -0.3, -0.5].map((delay, index) => (
        <CircleBox
          key={index}
          sx={{
            width: "10px",
            aspectRatio: "1/1",
            bgcolor: "text.linkTertiary",
            ...bounceSx,
            animation: `${bounce} 0.8s infinite`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </Box>
  );
}
