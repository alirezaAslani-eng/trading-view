"use client";

import { Switch } from "@mui/material";

interface DynamicSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function DynamicSwitch({
  checked,
  onChange,
  disabled = false,
}: DynamicSwitchProps) {
  return (
    <Switch
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange(event.target.checked)}
    />
  );
}