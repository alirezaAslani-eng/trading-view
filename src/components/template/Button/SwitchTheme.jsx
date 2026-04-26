"use client";
import FakeIcon from "@/components/ui/Icon/FakeIcon";
import { Box, Switch, Typography } from "@mui/material";

function SwitchTheme() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="button3"
        sx={{
          color: "text.disabled",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FakeIcon />
        {"حالت تیره"}
      </Typography>

      <Switch />
    </Box>
  );
}

export default SwitchTheme;
