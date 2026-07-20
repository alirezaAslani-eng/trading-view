"use client";
import { toggleButtonGroupSize, toggleButtonGroupTheme } from "./styles";
import { ToggleButtonGroupProps } from "./types";
import {
  styled,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@mui/material";

const toggleButtonGroupDefaults = {
  variant: "contained",
  color: "success",
  size: "medium",
} as const;

const ToggleButtonGroup = styled(MuiToggleButtonGroup, {
  shouldForwardProp: (prop) => {
    return prop !== "variant";
  },
})<ToggleButtonGroupProps>(({
  theme,
  color = toggleButtonGroupDefaults.color,
  variant = toggleButtonGroupDefaults.variant,
  size = toggleButtonGroupDefaults.size,
}) => {
  const toggleButtonGroup_size = toggleButtonGroupSize({ size, theme });
  const toggleButtonGroup_theme = toggleButtonGroupTheme({
    color,
    theme,
    variant,
  });

  return {
    ...toggleButtonGroup_size.rootSize,
    ...toggleButtonGroup_theme.rootTheme,
    ["& button"]: {
      ...toggleButtonGroup_size.toggleButtons,
    },
    "& button:not(.Mui-selected)": {
      ...toggleButtonGroup_theme.notSelected,
    },
    "& .Mui-selected": {
      ...toggleButtonGroup_theme.selected,
    },
  };
});

export default ToggleButtonGroup;
