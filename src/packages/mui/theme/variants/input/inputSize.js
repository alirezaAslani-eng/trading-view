/**
 * @returns {{rootSize?:object,placeholderSize?:object}}
 */
function inputSize({ theme, size }) {
  const sizes = {
    // * ------- medium size -------
    medium: {
      rootSize: {
        borderRadius: "10px",
        fontSize: theme.typography.body3.fontSize,
        fontFamily: theme.typography.body3.fontFamily,
        height: "42px",
        padding: "0px 12px",
      },
      placeholderSize: {
        fontSize: theme.typography.body3.fontSize,
        fontFamily: theme.typography.body3.fontFamily,
      },
    },
    // * ------- small size -------
    small: {
      rootSize: {
        borderRadius: "10px",
         fontSize: theme.typography.button4.fontSize,
        fontFamily: theme.typography.button4.fontFamily,
        height: "38px",
        padding: "0px 10px",
      },
      placeholderSize: {
        fontSize: theme.typography.button4.fontSize,
        fontFamily: theme.typography.button4.fontFamily,
      },
    },
  };
  return sizes?.[size] || sizes.medium;
}

export default inputSize;
