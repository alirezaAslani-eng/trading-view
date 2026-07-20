import { ThemeOptions } from "@mui/material";
import typography from "./typography";
import { darkPalette } from "./palettes";
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
} from "../overriders";

const theme: ThemeOptions = {
  typography,
  palette: darkPalette, // * darkPalette as defult theme
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
