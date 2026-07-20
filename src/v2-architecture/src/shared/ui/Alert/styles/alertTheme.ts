import { AlertThemeProps, AlertThemeReturn } from "./types";

function alertTheme({
  theme,
  variant,
  color,
}: AlertThemeProps): AlertThemeReturn {
  const { palette, alpha } = theme;
  const styles = {
    warning: {
      standard: {
        rootTheme: {
          color: palette.status.warning,
          backgroundColor: alpha(palette.status.warning, 0.08),
        },
        iconTheme: {
          color: palette.status.warning,
        },
      },
    },
  };

  return styles?.[color]?.[variant] || styles.warning.standard;
}

export default alertTheme;
