import { ThemeOptions } from "@mui/material";
import typography from "./typography";
import darkPalette from "./palette/darkPalette";
import {
  MuiAccordion,
  MuiAccordionDetails,
  MuiAccordionSummary,
  MuiAlert,
  MuiBadge,
  MuiButton,
  MuiCheckbox,
  MuiCssBaseline,
  MuiDialog,
  MuiFormLabel,
  MuiPaper,
  MuiSvgIcon,
  MuiToggleButton,
  MuiToggleButtonGroup,
  MuiSwitch,
} from "./overriders";
// import breakpoints from "./breakpoints";
/**
 * @type {ThemeOptions}
 */
const theme = {
  typography,
  palette: darkPalette, // * darkPalette as defult theme
  // breakpoints,
  spacing: 4,
  direction: "rtl",
  components: {
    MuiCssBaseline,
    MuiButton,
    MuiToggleButtonGroup,
    MuiPaper,
    MuiSvgIcon,
    MuiCheckbox,
    MuiFormLabel,
    MuiBadge,
    MuiToggleButton,
    MuiAlert,
    MuiDialog,
    MuiAccordion,
    MuiAccordionSummary,
    MuiAccordionDetails,
    MuiSwitch,
    MuiTypography: {
      defaultProps: {
        component: "p",
      },
    },
    MuiPopover: {
      defaultProps: {
        "aria-hidden": false,
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.inputModal,
        }),
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "0px 16px",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          paddingTop: "0px",
          paddingBottom: "0px",
        },
      },
    },
  },
};

export default theme;
