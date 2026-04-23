// * this object is only for defining the type of first parameter createCustomColors
const paletteStructure = {
  text: {
    disabled: "",
    profit: "",
    primary: "",
    sidebarActive: "",
    onPrimary: "",
    placeholder: "",
    linkSecondary: "",
    heading: "",
    secondary: "",
    caption: "",
    placeHolder: "",
    error: "",
    inputText: "",
  },
  background: {
    primary: "",
    toggleActive: "",
    input: "",
    inputModal: "",
    sidebarActive: "",
    surface: "",
    surfaceSecondary: "",
    surfaceTertiary: "",
    sell: "",
    buy: "",
  },
  border: {
    default: "",
    primary: "",
    secondary: "",
    error: "",
    white: "",
  },
  status: {
    profit: "",
    loss: "",
  },
};
const createCustomColors = (colors = paletteStructure) => colors;

export default createCustomColors;
