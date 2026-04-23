import { notDefinedColors } from "@/packages/mui/theme/shades";
import { Box, Typography } from "@mui/material";
import React from "react";

function PhoneCountryCode() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: notDefinedColors["#434343"],
          height: "26px",
          width: "2px",
        }}
      />
      <Typography sx={{ color: notDefinedColors["#B7B7B7"] }}>
        {"98+"}
      </Typography>
    </Box>
  );
}

export default PhoneCountryCode;
