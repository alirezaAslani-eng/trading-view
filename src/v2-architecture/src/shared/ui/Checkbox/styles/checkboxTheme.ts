
import { legacyColors } from "@/v2-architecture/src/design-system";
import { CheckboxThemeProps, CheckboxThemeReturn } from "./types";

function checkboxTheme({
  theme,
  color,
  variant,
}: CheckboxThemeProps): CheckboxThemeReturn {
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
          backgroundColor: `${legacyColors["#282828"]} !important`,
          borderColor: legacyColors["#474747"],
        },
      } satisfies CheckboxThemeReturn,
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
          borderColor: legacyColors["#474747"],
        },
      } satisfies CheckboxThemeReturn,
    },
  };

  return styles?.[color]?.[variant] || styles.primary.contained;
}

export default checkboxTheme;
