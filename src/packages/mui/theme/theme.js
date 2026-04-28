import {  ThemeOptions } from "@mui/material";
import typography from "./typography";
import darkPalette from "./palette/darkPalette";
import {
  MuiBadge,
  MuiButton,
  MuiCheckbox,
  MuiCssBaseline,
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
  },
};

export default theme;
