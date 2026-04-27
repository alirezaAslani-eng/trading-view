import { notDefinedColors } from "../shades";

/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiButton"]}
 */
const MuiButton = {
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      // *---start--- reset mui defult style on button --start---
      textTransform: "none",
      border: "none",
      backgroundColor: "transparent",
      ":hover": {
        backgroundColor: undefined,
        boxShadow: undefined,
      },
      // *---end--- reset mui defult style on button --end---
      ...buttonTheme(theme, ownerState),
    }),

    // * ---start--- button sizing ---start---
    sizeSmall: {
      height: "36px",
      borderRadius: "6px",
      padding: "0px 12px",
    },
    sizeMedium: {
      height: "45px",
      borderRadius: "10px",
      padding: "0px 16px",
    },
    sizeLarge: {
      height: "56px",
      borderRadius: "28px",
      padding: "0px 20px",
    },
    // * ---end--- button sizing ---end---
  },
};

export default MuiButton;

function buttonTheme(theme, ownerState) {
  const variant = ownerState?.variant;
  const color = ownerState?.color;
  // * -------- primary theme --------
  if (color === "primary") {
    if (variant === "contained") {
      return {
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.onPrimary,
      };
    }
    if (variant === "outlined") {
      return {
        border: "1px solid",
        borderColor: theme.palette.border.primary,
        color: notDefinedColors["#57A8FF"],
      };
    }
    if (variant === "text") {
      return {
        color: notDefinedColors["#57A8FF"],
      };
    }
  }
  // * -------- success theme --------
  if (color === "success") {
    if (variant === "contained") {
      return {
        backgroundColor: theme.palette.background.buy,
        color: theme.palette.text.onPrimary,
      };
    }
  }
}
