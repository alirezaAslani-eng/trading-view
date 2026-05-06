/**
 * @returns {{rootSize:object,toggleTabSize:object}}
 */

const borderRadius = "8px !important";

function toggleTabGroupSize({ size, theme }) {
  const sizes = {
    medium: {
      rootSize: {
        padding: "14px 22px",
        borderRadius,
        minHeight: "47px",
      },
      toggleTabSize: {
        borderRadius,
        fontSize: theme.typography.button2.fontSize,
        fontFamily: theme.typography.button2.fontFamily,
      },
    },
    small: {
      rootSize: {
        padding: "10px 16px",
        borderRadius,
        minHeight: "37px",
      },
      toggleTabSize: {
        borderRadius,
        fontSize: theme.typography.button3.fontSize,
        fontFamily: theme.typography.button3.fontFamily,
      },
    },
  };

  return sizes?.[size] || sizes.medium;
}

export default toggleTabGroupSize;
