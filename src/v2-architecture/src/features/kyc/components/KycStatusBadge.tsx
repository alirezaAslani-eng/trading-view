"use client";
import { CheckedIcon } from "@/v2-architecture/src/shared/ui";
import { alpha, Box } from "@mui/material";

function StatusBadge() {
  return (
    <Box
      sx={({ palette }) => ({
        width: "88px",
        aspectRatio: "1/1",
        borderRadius: "999px",
        backgroundColor: "transparent",
        outline: "1px solid",
        outlineColor: alpha(palette.text.profit!, 0.12),
        boxShadow: `0px 0px 10px ${alpha(palette.text.profit!, 0.48)}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <Box
        sx={({ palette }) => ({
          width: "60.56%",
          aspectRatio: "1/1",
          borderRadius: "999px",
          backgroundColor: palette.text.profit,
          outline: "10px solid",
          outlineColor: alpha(palette.text.profit!, 0.22),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <CheckedIcon sx={{ width: "22px", height: "15px" }} />
      </Box>
    </Box>
  );
}

export default StatusBadge;
