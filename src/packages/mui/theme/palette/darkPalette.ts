import type { PaletteOptions } from "@mui/material/styles";
import {
  blue,
  gray,
  green,
  notDefinedColors,
  nuetral,
  orange,
  red,
  white,
} from "@/packages/mui/theme/shades";

const darkPalette: PaletteOptions = {
  text: {
    disabled: nuetral[400],
    profit: green[400],
    primary: blue[500],
    primary2: blue[400],
    sidebarActive: white.white,
    onPrimary: white.white,
    placeHolder: nuetral[600],
    linkSecondary: nuetral[800],
    linkTertiary: nuetral[900],
    heading: white.white,
    secondary: white[300],
    caption: nuetral[700],
    error: red[600],
    placeholder: nuetral[800],
    inputText: white.white,
    tertiary: nuetral["400"],
    linkDisable: gray[180],
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
    surfaceLevel4: gray[270],
    surfaceLevel5: gray[500],
    default: gray[600],
    paper: notDefinedColors["#595B5F"],
  },
  border: {
    default: gray[200],
    error: red[600],
    primary: blue[500],
    secondary: gray[180],
    white: white.white,
    dark: gray[230],
  },
  status: {
    loss: red[500],
    profit: green[500],
    warning: orange[500],
  },
};

export default darkPalette;
