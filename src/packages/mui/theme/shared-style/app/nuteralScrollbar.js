const scrollbarWidth = "4px";
const borderRadius = "10px";
const nuteralScrollbar = (theme) => {
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

export default nuteralScrollbar;
