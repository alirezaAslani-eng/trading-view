import { notDefinedColors } from "../../shades";

/**
 *
 * @returns {{notCheckedTheme?:object,checkedTheme:object,rootStyle:object}}
 */
function checkboxTheme({ theme, color }) {
  const styles = {
    priamry: {
      rootStyle: {
        border: "1px solid",
      },
      checkedTheme: {
        color: theme.palette.text.onPrimary,
        backgroundColor: `${theme.palette.background.primary} !important`,
        borderColor: "transparent",
      },
      notCheckedTheme: {
        color: theme.palette.text.onPrimary,
        backgroundColor: `${notDefinedColors["#282828"]} !important`,
        borderColor: notDefinedColors["#474747"],
      },
    },
  };

  return styles?.[color] || styles.priamry;
}

export default checkboxTheme;
