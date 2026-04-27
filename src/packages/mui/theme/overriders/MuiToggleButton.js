/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiToggleButton"]}
 */
const MuiToggleButton = {
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      // * ---start--- reset default style of ToggleButton ---start---
      borderRadius: "0px",
      border: "none",
      height: "fit-content",
      background: "none !important",
      padding: "0px",
      // Todo -> Remove Hover effect
      ":last-of-type": {
        border: "none",
      },
      ...toggleButtonTheme(theme, ownerState),
    }),
    // * ---end--- define colors for ToggleButton's state ---end---

    // * ---start--- sizes for ToggleButton ---start---
    sizeLarge: ({ theme }) => ({
      height: "56px",
      padding: "0px 20px",
      borderRadius: "50px !important",
      fontSize: theme.typography.button2.fontSize,
    }),
    sizeMedium: ({ theme }) => ({
      height: "38px",
      padding: "0px 8px",
      borderRadius: "6px !important",
      fontSize: theme.typography.button4.fontSize,
    }),
    // * ---end--- sizes for ToggleButton ---end---
  },
};

export default MuiToggleButton;

function toggleButtonTheme(theme, ownerState) {
  const variant = ownerState?.["data-variant"] ?? "contained";
  const color = ownerState?.color ?? "primary";
  // * -------- primary theme --------
  if (color === "primary") {
    if (variant === "contained") {
      return {
        ...(ownerState.selected && {
          backgroundColor: `${theme.palette.background.primary} !important`,
          color: `${theme.palette.text.onPrimary} !important`,
        }),
        ...(!ownerState.selected && {
          backgroundColor: `transparent`,
          color: theme.palette.text.onPrimary,
        }),
      };
    }
  }
  // * -------- success theme --------
  if (color === "success") {
    if (variant === "contained") {
      return {
        ...(!ownerState.selected && {
          backgroundColor: "transparent",
          color: theme.palette.text.disabled,
        }),
        ...(ownerState.selected && {
          backgroundColor: `${theme.palette.background.buy} !important`,
          color: `${theme.palette.text.onPrimary} !important`,
        }),
      };
    }
  }
  // * -------- gray theme --------
  if (color === "nuteral") {
    if (variant === "contained") {
      return {
        ...(ownerState.selected && {
          backgroundColor: `${theme.palette.background.toggleActive} !important`,
          color: theme.palette.text.onPrimary,
        }),
        ...(!ownerState.selected && {
          backgroundColor: `transparent`,
          color: theme.palette.text.linkSecondary,
        }),
      };
    }
  }
}
