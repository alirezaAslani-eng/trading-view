/**
 * @returns {{rootSize?:object}}
 */
function textareaSize({ size }) {
  const sizes = {
    // * ------- medium size -------
    medium: {
      rootSize: {
        minHeight: "110px",
        resize: "none",
        paddingTop: "12px",
        paddingBottom: "12px",
      },
    },
    // * ------- small size -------
    small: {
      rootSize: {
        minHeight: "110px",
        resize: "none",
        paddingTop: "10px",
        paddingBottom: "10px",
      },
    },
  };
  return sizes?.[size] || sizes.medium;
}

export default textareaSize;
