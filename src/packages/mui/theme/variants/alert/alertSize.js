import { defaultAlertVariants } from "@/packages/mui/theme/variants";
/**
 * @returns {{rootSize?:object,iconSize?:object}}
 */
function alertSize({ theme, size = defaultAlertVariants.size }) {
  const sizes = {
    small: {
      rootSize: {
        minHeight: "30px",
        borderRadius: "8px",
        padding: "6.5px 8px",
        gap: "8px",
        fontSize: theme.typography.body3.fontSize,
        fontFamily: theme.typography.body3.fontFamily,
      },
      iconSize: {
        width: "18px",
        height: "18px",
      },
    },
  };

  return sizes?.[size] || sizes.small;
}

export default alertSize;
