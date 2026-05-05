const scrollbarWidth = "4px";
const borderRadius = "10px";
const nuteralScrollbar = (theme) => {
  const { palette } = theme;
  return {
    "::-webkit-scrollbar": {
      backgroundColor: palette.background.inputModal,
      width: scrollbarWidth,
      borderRadius: borderRadius,
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: palette.text.caption,
      borderRadius: borderRadius,
    },
    "@-moz-document url-prefix()": {
      scrollbarWidth: "thin",
      scrollbarColor: `${palette.text.caption} ${palette.background.inputModal}`,
    },
  };
};

export default nuteralScrollbar;
