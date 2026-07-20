import { SxPropOnlyObject } from "@/design-system";
import { Theme } from "@mui/material";

//#region // * ------------ Hide Scroll style ------------
export const hideScrollBar: SxPropOnlyObject = {
  /* (Chrome, Edge, Safari) */
  "::-webkit-scrollbar": {
    width: "0px",
    height: "0px",
  },
  "::-webkit-scrollbar-track": {
    background: "transparent",
  },
  scrollbarWidth: "0px",
};
//#endregion // * ------------ Hide Scroll style ------------

//#region // * ------------ Nuteral Scroll Style ------------
const scrollbarWidth = "4px";
const borderRadius = "10px";
export const nuteralScrollbar = (theme: Theme) => {
  const { palette } = theme;
  return {
    "::-webkit-scrollbar": {
      backgroundColor: palette.background.inputModal,
      width: scrollbarWidth,
      height: scrollbarWidth,
      borderRadius: borderRadius,
      cursor: "pointer",
    },
    "::-webkit-scrollbar-thumb": {
      borderRadius: borderRadius,
      backgroundColor: palette.text.caption,
      cursor: "pointer",
    },
    "::-webkit-scrollbar-corner": {
      backgroundColor: "transparent",
    },
    "@-moz-document url-prefix()": {
      scrollbarWidth: "thin",
      scrollbarColor: `${palette.text.caption} ${palette.background.inputModal}`,
    },
  };
};
//#endregion // * ------------ Nuteral Scroll Style ------------

//#region // * ------------ BulletItems shared warning spacing ------------
export const warningBulletItemsContainerSx: SxPropOnlyObject = {
  display: "flex",
  flexDirection: "column",
  gap: "20px", // * space between bullet items
  mt: "32px",
};
//#endregion // * ------------ BulletItems shared warning spacing ------------
