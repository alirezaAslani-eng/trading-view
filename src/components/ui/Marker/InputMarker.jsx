import { Box } from "@mui/material";

function InputMarker({ icon, children, right, left }) {
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
