import { ThemeOptions } from "@mui/material";
import typography from "./typography";
import lightPalette from "./palette/lightPalette";
import breakpoints from "./breakpoints";

/**
 * @type {ThemeOptions}
 */
const theme = {
  typography,
  palette: lightPalette, // * lightPalette as defult theme
  breakpoints,
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
