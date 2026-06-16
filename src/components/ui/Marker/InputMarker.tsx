import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface InputMarkerProps extends ReplaceSxWithSxOnlyObject<BoxProps> {
  icon?: ReactNode;
  right?: string;
  left?: string;
}
function InputMarker({
  icon,
  children,
  right,
  left,
  ...props
}: InputMarkerProps) {
  return (
    <Box {...props} sx={{ position: "relative", ...props.sx }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          right,
          left,
        }}
      >
        {icon}
      </Box>
      {children}
    </Box>
  );
}

export default InputMarker;
