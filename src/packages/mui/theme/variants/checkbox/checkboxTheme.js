import { notDefinedColors } from "../../shades";
import { defaultCheckboxVariants } from "@/packages/mui/theme/variants";

/**
 *
 * @returns {{notCheckedTheme?:object,checkedTheme:object,rootStyle:object}}
 */
function checkboxTheme({
  theme,
  color = defaultCheckboxVariants.color,
  variant = defaultCheckboxVariants.variant,
}) {
  const styles = {
    primary: {
      contained: {
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
      outlined: {
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
          backgroundColor: `transparent !important`,
          borderColor: notDefinedColors["#474747"],
        },
      },
    },
  };

  return styles?.[color]?.[variant] || styles.primary.contained;
}

export default checkboxTheme;
