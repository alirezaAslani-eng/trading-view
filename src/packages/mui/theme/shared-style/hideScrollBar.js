/**
 * @type {import("@mui/system").SystemStyleObject<import("@mui/material").Theme>}
 */
const hideScrollBar = {
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

export default hideScrollBar;