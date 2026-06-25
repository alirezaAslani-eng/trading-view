import React from "react";
import { Box, Switch, Typography } from "@mui/material";

interface SettingCheckBoxType {
  title: string;
  description: string;
}
const SettingCheckBox = ({ title, description }: SettingCheckBoxType) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "start",
      gap: "12px",
      justifyContent: "center",
      marginTop: "20px",
    }}
  >
    <Box>
      <Switch />
    </Box>
    <Box
      sx={{
        display: "flexRow",
        gap: "6px",
      }}
    >
      <Typography variant="body2" sx={{ color: "text.onPrimary" }}>
        ورود با حساب گوگل
      </Typography>
      <Typography variant="body3" sx={{ color: "text.tertiary" }}>
        در صورت فعال بودن این گزینه، می‌توانید با حساب کاربری گوگل/جیمیل خود
        وارد شوید
      </Typography>
    </Box>
  </Box>
);

export default SettingCheckBox;
