import React from "react";
import { Box, Typography } from "@mui/material";
import DynamicSwitch from "@/components/template/DynamicSwitch/DynamicSwitch";

interface SettingCheckboxProps {
  title: string;
  description: string;
  disabled?: boolean;
  checked: boolean;
  onChange: (value: boolean) => void;
}
export default function SettingCheckBox({
  title,
  description,
  disabled = false,
  checked,
  onChange,
}: SettingCheckboxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
      }}
    >
      <DynamicSwitch
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <Typography variant="body2" color="text.onPrimary">
          {title}title
        </Typography>
        <Typography variant="body3" color="text.tertiary">
          {description}mvvvvvvvvvvvvvvvvvvvvvvvvvvdcffffffffff
        </Typography>
      </Box>
    </Box>
  );
}