"use client";
import SunIcon from "@/assets/svg/sun.svg";
import { Box, SvgIcon, Switch, Typography } from "@mui/material";

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
        <SvgIcon sx={{ color: "text.disabled" }}>
          <SunIcon />
        </SvgIcon>
        {"حالت تیره"}
      </Typography>

      <Switch />
    </Box>
  );
}

export default SwitchTheme;
