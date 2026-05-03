import { alpha } from "@mui/material";

/**
 * @returns {{rootTheme:object}}
 */
function listItemShapeSize({ color, theme }) {
  const styles = {
    disabled: {
      rootTheme: {
        backgroundColor: theme.palette.text.placeholder,
        outlineColor: alpha(theme.palette.text.placeholder, 0.14),
      },
    },
    primary: {
      rootTheme: {
        backgroundColor: theme.palette.text.primary2,
        outlineColor: alpha(theme.palette.text.primary2, 0.2),
      },
    },
  };

  return styles?.[color] || styles.primary;
}

export default listItemShapeSize;
