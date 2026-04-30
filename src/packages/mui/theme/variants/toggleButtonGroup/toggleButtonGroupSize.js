/**
 * @returns {{rootSize:object,toggleButtons:object}}
 */
function toggleButtonGroupSize({ size, theme }) {
  const sizes = {
    large: {
      toggleButtons: {
        height: "56px",
        padding: "0px 20px",
        borderRadius: "50px !important",
        fontSize: theme.typography.button2.fontSize,
        fontFamily: theme.typography.button2.fontFamily,
      },
    },
    medium: {
      rootSize: {
        padding: "6px",
        gap: "6px",
        borderRadius: "10px",
      },
      toggleButtons: {
        height: "38px",
        padding: "0px 2px",
        borderRadius: "6px !important",
        fontSize: theme.typography.button4.fontSize,
        fontFamily: theme.typography.button4.fontFamily,
      },
    },
  };

  return sizes?.[size] || sizes.medium;
}

export default toggleButtonGroupSize;
