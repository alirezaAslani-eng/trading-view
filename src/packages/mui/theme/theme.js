import { ThemeOptions } from "@mui/material";
import typography from "./typography";
import darkPalette from "./palette/darkPalette";
import { notDefinedColors } from "./shades";
// import breakpoints from "./breakpoints";

/**
 * @type {ThemeOptions}
 */
const theme = {
  typography,
  palette: darkPalette, // * darkPalette as defult theme
  // breakpoints,

  direction: "rtl",
  components: {
    MuiButton: {
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
    },
    MuiToggleButton: {
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
          height: "36px",
          padding: "0px 8px",
          borderRadius: "6px !important",
          fontSize: theme.typography.button4.fontSize,
        }),
        // * ---end--- sizes for ToggleButton ---end---
      },
    },
    MuiToggleButtonGroup: {
      defaultProps: {
        dir: "rtl",
        exclusive: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "unset",
        },
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        cursor: "pointer",
      },
    },
  },
};

export default theme;

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
  if (color === "gray") {
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
