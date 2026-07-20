"use client";
import { StyledToggleTabGroupProps } from "./types";
import { toggleTabGroupSize, toggleTabGroupTheme } from "./styles";
import { FC } from "react";
import {
  styled,
  ToggleButtonGroup as MuiToggleButtonGroup_,
} from "@mui/material";

const toggleTabGroupDefaults = {
  variant: "contained",
  color: "nuteral",
  size: "medium",
} as const;

const MuiToggleButtonGroup =
  MuiToggleButtonGroup_ as FC<StyledToggleTabGroupProps>;

const ToggleTabGroup = styled(MuiToggleButtonGroup, {
  shouldForwardProp: (prop) => {
    return prop !== "variant";
  },
})(
  ({
    theme,
    color = toggleTabGroupDefaults.color,
    variant = toggleTabGroupDefaults.variant,
    size = toggleTabGroupDefaults.size,
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
  }
);

export default ToggleTabGroup;
