/**
 * @return {{summarySize?:object,contentSize?:object,contentIconSize?:object,expandIconSize?:object}} param0
 */
const accordionSize = ({ size, theme }) => {
  const sizes = {
    large: {
      expandIconSize: { width: "18px", height: "18px" },
      contentIconSize: { width: "22px", height: "22px" },
      summarySize: {
        borderWidth: "1px",
        borderRadius: "14px",
        minHeight: "62px",
        padding: "0px 14px",
      },
      contentSize: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: theme.typography.body1.fontSize,
        fontFamily: theme.typography.body1.fontFamily,
        lineHeight: theme.typography.body1.lineHeight,
      },
    },

    medium: {
      expandIconSize: { width: "18px", height: "18px" },
      contentIconSize: { width: "20px", height: "20px" },
      summarySize: {
        borderWidth: "1px",
        borderRadius: "14px",
        minHeight: "52px",
        padding: "0px 14px",
      },
      contentSize: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: theme.typography.body2.fontSize,
        fontFamily: theme.typography.body2.fontFamily,
        lineHeight: theme.typography.body2.lineHeight,
      },
    },
  };

  return sizes?.[size] || sizes.large;
};

export default accordionSize;
