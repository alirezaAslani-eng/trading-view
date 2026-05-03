/**
 * @returns {{rootSize:object}}
 */
function listItemShapeSize({ size }) {
  const sizes = {
    small: {
      rootSize: {
        width: "6px",
        outlineWidth: "2px",
      },
    },
  };

  return sizes?.[size] || sizes.small;
}

export default listItemShapeSize;
