import { StepConnector, ThemeOptions } from "@mui/material";
import typography from "./typography";
import darkPalette from "./palette/darkPalette";
import { DashedLine } from "@/components/ui/Icon";

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
import { notDefinedColors } from "./shades";
// import breakpoints from "./breakpoints";

const theme: ThemeOptions = {
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
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
      defaultProps: {
        animation: "pulse",
      },
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
        paper: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: ({ theme }) => {
          const { palette } = theme;
          return {
            gap: "8px",
            "& .MuiStepConnector-root .MuiStepConnector-line": {
              borderColor: notDefinedColors["#003975"],
            },
            "& .MuiStepConnector-root.Mui-completed  .MuiStepConnector-line": {
              borderColor: palette.text.primary2,
            },
            "& .MuiStepConnector-line": {
              borderTopStyle: "dashed",
              borderTopWidth: "2px",
              color: palette.text.onPrimary,
            },
          };
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          paddingRight: "0px",
          paddingLeft: "0px",
          gap: "4px",
          "& .MuiStepLabel-iconContainer": {
            paddingRight: "0px",
            widht: "fit-content",
          },
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: ({ theme }) => {
          const { palette } = theme;
          return {
            paddingRight: "0px",
            paddingLeft: "0px",
            "& .MuiStepLabel-label": {
              color: `${palette.text.onPrimary} !important`,
            },
          };
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          const { spacing } = theme;
          return { gap: spacing(2), margin: 0 };
        },

        label: ({ theme }) => {
          const { typography, palette } = theme;
          return {
            ...typography.button2,
            color: palette.text.secondary,
            userSelect: "none",
            whiteSpace: "nowrap",
          };
        },
      },
    },
  },
};

export default theme;
