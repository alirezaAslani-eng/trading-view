"use client";
import SunIcon from "@/assets/svg/sun.svg";
import { Box, SvgIcon, Switch, Typography } from "@mui/material";

function SwitchTheme({ collapsed = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: collapsed ? "center" : "space-between",
        alignItems: "center",
        width: collapsed ? "auto" : "100%",
      }}
    >
      <Typography
        variant="button3"
        sx={{
          color: "text.disabled",
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : "10px",
        }}
      >
        <SvgIcon sx={{ color: "text.disabled" }}>
          <SunIcon />
        </SvgIcon>
        {!collapsed && "حالت تیره"}
      </Typography>

      {!collapsed && <Switch />}
    </Box>
  );
}

export default SwitchTheme;
