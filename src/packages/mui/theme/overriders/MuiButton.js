import { notDefinedColors } from "../shades";
import { buttonTheme } from "../variants";

/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiButton"]}
 */
const MuiButton = {
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const button_theme = buttonTheme({
        theme,
        color: ownerState.color,
        variant: ownerState.variant,
      });
      return {
        // *---start--- reset mui defult style on button --start---
        textTransform: "none",
        border: "none",
        backgroundColor: "transparent",
        ":hover": {
          backgroundColor: undefined,
          boxShadow: undefined,
        },
        // *---end--- reset mui defult style on button --end---
        ...button_theme?.rootStyle,
      };
    },

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
