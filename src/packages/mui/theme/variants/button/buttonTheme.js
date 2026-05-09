const { notDefinedColors } = require("../../shades");

/**
 * @returns {{rootStyle:object}}
 */
function buttonTheme({ theme, variant, color }) {
  // * -------- primary theme --------
  const styles = {
    primary: {
      contained: {
        rootStyle: {
          backgroundColor: theme.palette.background.primary,
          color: theme.palette.text.onPrimary,
        },
      },
      outlined: {
        rootStyle: {
          border: "1px solid",
          borderColor: theme.palette.border.primary,
          color: notDefinedColors["#57A8FF"],
        },
      },
      text: {
        rootStyle: {
          backgroundColor: "transparent",
          border: "none",
          color: theme.palette.text.primary2,
        },
      },
    },

    // * -------- success theme --------
    success: {
      contained: {
        rootStyle: {
          backgroundColor: theme.palette.background.buy,
          color: theme.palette.text.onPrimary,
        },
      },
    },
  };

  return styles?.[color]?.[variant] || styles.primary.contained;
}

export default buttonTheme;
