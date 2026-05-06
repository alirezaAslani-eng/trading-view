"use client";
import {
  defaultToggleGroupButtonVariants,
  toggleTabGroupSize,
  toggleTabGroupTheme,
} from "@/packages/mui/theme/variants";
import {
  styled,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@mui/material";

const ToggleTabGroup = styled(MuiToggleButtonGroup, {
  shouldForwardProp: (prop) => {
    return prop !== "variant";
  },
})(({
  theme,
  color,
  variant = defaultToggleGroupButtonVariants.variant,
  size,
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
  };
});

export default ToggleTabGroup;
