import { PaletteOptions } from "@mui/material/styles";
import { createCustomColors, setMode } from "@/packages/mui/theme/helpers";
import {
  blue,
  gray,
  green,
  notDefinedColors,
  nuetral,
  red,
  white,
} from "@/packages/mui/theme/shades";

const darkCustomColors = createCustomColors({
  text: {
    disabled: nuetral[400],
    profit: green[400],
    primary: blue[500],
    sidebarActive: white.white,
    onPrimary: white.white,
    placeHolder: nuetral[600],
    linkSecondary: nuetral[800],
    heading: white.white,
    secondary: white[300],
    caption: nuetral[700],
    error: red[600],
    placeholder: nuetral[800],
  },
  background: {
    primary: blue[500],
    toggleActive: gray[250],
    input: gray[250],
    inputModal: gray[220],
    sidebarActive: gray[200],
    surface: gray[600],
    surfaceSecondary: gray[300],
    surfaceTertiary: gray[230],
    sell: red[600],
    buy: green[500],
  },
  border: {
    default: gray[200],
    error: red[600],
    primary: blue[500],
    secondary: gray[180],
    white: white.white,
  },
  status: {
    loss: red[500],
    profit: red[500],
  },
});
/**
 * @type {PaletteOptions}
 */
const darkPalette = {
  ...darkCustomColors,
  mode: setMode("dark"),
  background: {
    default: darkCustomColors.background.surface,
    paper: notDefinedColors["#595B5F"],
  },
};

export default darkPalette;
