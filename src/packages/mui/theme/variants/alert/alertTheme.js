import { alpha } from "@mui/material";

/**
 * @returns {{rootTheme?:object,iconTheme?:object}}
 */
function alertSize({ theme, variant, color }) {
  const { palette } = theme;
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

export default alertSize;
