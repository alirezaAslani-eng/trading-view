import { SvgIcon, ThemeOptions } from "@mui/material";
import typography from "./typography";
import darkPalette from "./palette/darkPalette";
import { notDefinedColors } from "./shades";
import CheckedIcon from "@/assets/svg/checked.svg";
import {
  MuiBadge,
  MuiButton,
  MuiCheckbox,
  MuiCssBaseline,
  MuiFormLabel,
  MuiPaper,
  MuiSvgIcon,
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
  },
};

export default theme;