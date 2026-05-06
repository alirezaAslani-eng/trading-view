"use client";
import {
  defaultToggleGroupButtonVariants,
  toggleButtonGroupSize,
  toggleButtonGroupTheme,
} from "@/packages/mui/theme/variants";
import {
  styled,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@mui/material";

const ToggleButtonGroup = styled(MuiToggleButtonGroup, {
  shouldForwardProp: (prop) => {
    return prop !== "variant";
  },
})(({
  theme,
  color,
  variant = defaultToggleGroupButtonVariants.variant,
  size,
}) => {
  const toggleButtonGroup_size = toggleButtonGroupSize({ size, theme });
  const toggleButtonGroup_theme = toggleButtonGroupTheme({
    color,
    theme,
    variant,
  });

  return {
    ...toggleButtonGroup_size?.rootSize,
    ...toggleButtonGroup_theme?.rootStyle,
    ["& button"]: {
      ...toggleButtonGroup_size?.toggleButtons,
    },
    "& button:not(.Mui-selected)": {
      ...toggleButtonGroup_theme?.notSelected,
    },
    "& .Mui-selected": {
      ...toggleButtonGroup_theme?.selected,
    },
  };
});

export default ToggleButtonGroup;
