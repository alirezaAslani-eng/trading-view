import {
  defaultToggleGroupButtonVariants,
  toggleButtonGroupSize,
  toggleButtonGroupTheme,
} from "../variants";

/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiToggleButtonGroup"]}
 */
const MuiToggleButtonGroup = {
  defaultProps: {
    dir: "rtl",
    exclusive: true,
  },

  styleOverrides: {
    root: ({ ownerState, theme }) => {
      const toggle_button_size = toggleButtonGroupSize({
        theme,
        size: ownerState.size,
      });
      const toggle_button_theme = toggleButtonGroupTheme({
        theme,
        color: ownerState.color,
        variant:
          ownerState?.["data-variant"] ??
          defaultToggleGroupButtonVariants.variant,
      });
      return {
        height: "fit-content",
        ...toggle_button_size?.rootSize,
        ["& button"]: {
          borderRadius: "0px",
          border: "none",
          height: "fit-content",
          padding: "0px",
          ...toggle_button_size?.toggleButtons,
        },
        ...toggle_button_theme?.rootStyle,
        "& button:not(.Mui-selected)": {
          ...toggle_button_theme?.notSelected,
        },
        "& .Mui-selected": {
          ...toggle_button_theme?.selected,
        },
      };
    },
  },
};

export default MuiToggleButtonGroup;
