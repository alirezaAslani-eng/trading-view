"use client";
import { StyledToggleTabGroupProps } from "../types";
import { FC } from "react";
import {
  styled,
  ToggleButtonGroup as MuiToggleButtonGroup_,
} from "@mui/material";
import {
  defaultToggleTabGroupVariants,
  toggleTabGroupSize,
  toggleTabGroupTheme,
} from "@/packages/mui/theme/variants";

const MuiToggleButtonGroup =
  MuiToggleButtonGroup_ as FC<StyledToggleTabGroupProps>;

const ToggleTabGroup = styled(MuiToggleButtonGroup, {
  shouldForwardProp: (prop) => {
    return prop !== "variant";
  },
})(({
  theme,
  color = defaultToggleTabGroupVariants.color,
  variant = defaultToggleTabGroupVariants.variant,
  size = defaultToggleTabGroupVariants.size,
}) => {
  const toggleTabGroup_size = toggleTabGroupSize({ size, theme });
  const toggleTabGroup_theme = toggleTabGroupTheme({
    color,
    theme,
    variant,
  });

  return {
    ...toggleTabGroup_size?.rootSize,
    ...toggleTabGroup_theme?.rootStyle,
    "& .MuiTouchRipple-root": { display: "none" },
    ["& button"]: {
      ...toggleTabGroup_size?.toggleTabSize,
      flex: "0 0 fit-content",
    },
    "& button:not(.Mui-selected)": {
      ...toggleTabGroup_theme?.notSelectedTab,
    },
    "& .Mui-selected": {
      ...toggleTabGroup_theme?.selectedTab,
    },
    "& .MuiDivider-root": {
      ...toggleTabGroup_theme.dividerStyle,
      ...toggleTabGroup_size.dividerSize,
    },
  };
});

export default ToggleTabGroup;
