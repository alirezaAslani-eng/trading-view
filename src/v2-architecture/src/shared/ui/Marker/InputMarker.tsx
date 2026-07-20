import { Box } from "@mui/material";
import { ReactNode, PropsWithChildren } from "react";

interface InputMarkerProps {
  icon?: ReactNode;
  right?: string;
  left?: string;
}
function InputMarker({
  icon,
  children,
  right,
  left,
}: PropsWithChildren<InputMarkerProps>) {
  return (
    <Box sx={{ position: "relative" }}>
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
