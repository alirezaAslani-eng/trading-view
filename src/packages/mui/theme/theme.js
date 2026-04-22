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
        root: {
          // *---start--- reset mui defult style on button --start---
          textTransform: "none",
          border: "none",
          backgroundColor: "transparent",
          ":hover": {
            backgroundColor: undefined,
            boxShadow: undefined,
          },
          // *---end--- reset mui defult style on button --end---


          // * ---start--- button variants ---start---
          variants: [
            {
              props: { variant: "outlined" },
              style: ({ theme }) => ({
                border: "1px solid",
                borderColor: theme.palette.border.primary,
                color: notDefinedColors["#57A8FF"],
              }),
            },
            {
              props: { variant: "contained" },
              style: ({ theme }) => ({
                backgroundColor: theme.palette.background.primary,
                color: theme.palette.text.onPrimary,
              }),
            },
          ],
          // * ---end--- button variants ---end---
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
