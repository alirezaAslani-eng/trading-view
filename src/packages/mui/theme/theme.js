import { ThemeOptions } from "@mui/material";
import typography from "./typography";
import darkPalette from "./palette/darkPalette";
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
        root: {
          textTransform: "none",
        },
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
