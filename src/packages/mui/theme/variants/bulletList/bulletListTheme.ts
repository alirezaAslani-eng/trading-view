import { alpha } from "@mui/material";
import { BulletListThemeProps, BulletListThemeReturn } from "../types";

function bulletListTheme({
  color,
  theme,
  variant,
}: BulletListThemeProps): BulletListThemeReturn {
  const { palette } = theme;

  const styles = {
    disabled: {
      contained: {
        rootTheme: {
          border: "1px solid",
          borderColor: palette.border.default,
          borderRadius: "12px",
          backgroundColor: palette.background.inputModal,
        },
      } satisfies BulletListThemeReturn,
    },
    primary: {
      contained: {
        rootTheme: {
          border: "1px solid",
          borderColor: palette.text.primary2,
          borderRadius: "12px",
          backgroundColor: palette.background.inputModal,
        },
      } satisfies BulletListThemeReturn,
    },
    warning: {
      standard: {
        rootTheme: {
          backgroundColor: alpha(palette.status.warning, 0.06),
          borderRadius: "16px",
        },
      } satisfies BulletListThemeReturn,
    },
  };

  //@ts-ignore
  return styles?.[color]?.[variant] || styles.primary.contained;
}

export default bulletListTheme;
