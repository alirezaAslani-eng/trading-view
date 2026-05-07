import { PWC } from "@/types/utils";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface InputMarkerProps {
  icon?: ReactNode;
  right?: string;
  left?: string;
}
function InputMarker({ icon, children, right, left }: PWC<InputMarkerProps>) {
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
