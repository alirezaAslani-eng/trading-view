"use client";
import { ToggleButtonGroupProps } from "@/components/ui/types";
import {
  styled,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@mui/material";
import {
  defaultToggleGroupButtonVariants,
  toggleButtonGroupSize,
  toggleButtonGroupTheme,
} from "@/packages/mui/theme/variants";

const ToggleButtonGroup = styled(MuiToggleButtonGroup, {
  shouldForwardProp: (prop) => {
    return prop !== "variant";
  },
})<ToggleButtonGroupProps>(({
  theme,
  color = defaultToggleGroupButtonVariants.color,
  variant = defaultToggleGroupButtonVariants.variant,
  size = defaultToggleGroupButtonVariants.size,
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
