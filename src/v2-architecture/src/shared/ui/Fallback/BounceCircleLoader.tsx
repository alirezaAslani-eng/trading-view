"use client";
import { Box } from "@mui/material";
import { BoxProps, keyframes } from "@mui/material";
import { CircleBox } from "../Box";
import {
  ReplaceSxWithSxOnlyObject,
  SxPropOnlyObject,
} from "@/v2-architecture/src/design-system";

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
