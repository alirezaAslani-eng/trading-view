import { StatusBadgeThemeProps, StatusBadgeThemeReturn } from "./types";

function statusBadgeTheme({
  color,
  theme,
}: StatusBadgeThemeProps): StatusBadgeThemeReturn {
  const { palette, alpha } = theme;
  const styles = {
    // * ----------- Warning ------------
    warning: {
      rootTheme: {
        color: palette.text.onPrimary,
        backgroundColor: alpha(palette.status.warning, 0.07),
      },
      iconTheme: {
        color: palette.status.warning,
      },
    } satisfies StatusBadgeThemeReturn,
    // * ----------- Error ------------
    error: {
      rootTheme: {
        color: palette.text.onPrimary,
        backgroundColor: alpha(palette.text.error!, 0.07),
      },
      iconTheme: {
        color: palette.text.error!,
      },
    } satisfies StatusBadgeThemeReturn,
    // * ----------- Success ------------
    success: {
      rootTheme: {
        color: palette.text.onPrimary,
        backgroundColor: alpha(palette.status.profit, 0.07),
      },
      iconTheme: {
        color: palette.status.profit!,
      },
    } satisfies StatusBadgeThemeReturn,
    // * ----------- Disabled ------------
    disabled: {
      rootTheme: {
        color: palette.text.linkTertiary,
        backgroundColor: palette.background.surfaceLevel4,
      },
      iconTheme: {
        display: "none",
      },
    } satisfies StatusBadgeThemeReturn,
  };

  return styles?.[color] || styles.success;
}


export default statusBadgeTheme