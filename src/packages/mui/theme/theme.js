import { ThemeOptions } from "@mui/material";
import typography from "./typography";
import darkPalette from "./palette/darkPalette";
import {
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
  },
};

export default theme;
