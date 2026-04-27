import {
  activeToggleButtonSelector,
  allToggleButtonsSelector,
  inactiveToggleButtonSelector,
} from "@/packages/mui/theme/class-selectors/toggleButtonGroupSelectors";

/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiToggleButtonGroup"]}
 */
const MuiToggleButtonGroup = {
  defaultProps: {
    dir: "rtl",
    exclusive: true,
  },

  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      ...toggleButtonGroupSize(theme, ownerState),
      [allToggleButtonsSelector]: {
        borderRadius: "0px",
        border: "none",
        height: "fit-content",
        padding: "0px",
        ...toggleButtonGroupSize(theme, ownerState)["& button"],
      },
      ...toggleButtonGroupTheme(theme, ownerState),
    }),
  },
};

export default MuiToggleButtonGroup;

function toggleButtonGroupSize(theme, ownerState) {
  const size = ownerState.size;
  // * ----- Large ------
  if (size === "large") {
    return {
      [allToggleButtonsSelector]: {
        height: "56px",
        padding: "0px 20px",
        borderRadius: "50px !important",
        fontSize: theme.typography.button2.fontSize,
        fontFamily: theme.typography.button2.fontFamily,
      },
    };
  }
  // * ----- Medium ------
  if (size === "medium") {
    return {
      // * -------- ToggleButtonGroup --------
      padding: "6px",
      gap: "6px",
      borderRadius: "10px",
      // * -------- ToggleButton --------
      [allToggleButtonsSelector]: {
        height: "38px",
        padding: "0px 8px",
        borderRadius: "6px !important",
        fontSize: theme.typography.button4.fontSize,
        fontFamily: theme.typography.button4.fontFamily,
      },
    };
  }
}

function toggleButtonGroupTheme(theme, ownerState) {
  const variant = ownerState?.["data-variant"] ?? "contained";
  const color = ownerState?.color ?? "primary";
  // * -------- primary theme --------
  if (color === "primary") {
    if (variant === "contained") {
      return {
        [inactiveToggleButtonSelector]: {
          background: `transparent !important`,
          color: theme.palette.text.onPrimary,
        },
        [activeToggleButtonSelector]: {
          backgroundColor: `${theme.palette.background.primary} !important`,
          color: `${theme.palette.text.onPrimary} !important`,
        },
      };
    }
  }
  // * -------- success theme --------
  if (color === "success") {
    if (variant === "contained") {
      return {
        // * -------- ToggleButtonGroup --------
        backgroundColor: theme.palette.background.surface,
        // * -------- ToggleButton --------
        [inactiveToggleButtonSelector]: {
          backgroundColor: "transparent",
          color: theme.palette.text.disabled,
        },
        [activeToggleButtonSelector]: {
          backgroundColor: `${theme.palette.background.buy} !important`,
          color: `${theme.palette.text.onPrimary} !important`,
        },
      };
    }
  }
  // * -------- nuteral theme --------
  if (color === "nuteral") {
    if (variant === "contained") {
      return {
        // * -------- ToggleButtonGroup --------
        backgroundColor: theme.palette.background.surface,
        // * -------- ToggleButton --------
        [inactiveToggleButtonSelector]: {
          backgroundColor: `transparent`,
          color: theme.palette.text.linkSecondary,
        },
        [activeToggleButtonSelector]: {
          backgroundColor: `${theme.palette.background.toggleActive} !important`,
          color: theme.palette.text.onPrimary,
        },
      };
    }
  }
}
