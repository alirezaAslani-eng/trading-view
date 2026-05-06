import { AccordionSizeProps, AccordionSizeReturn } from "../types";

const accordionSize = ({
  size,
  theme,
}: AccordionSizeProps): AccordionSizeReturn => {
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
    } satisfies AccordionSizeReturn,

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
    } satisfies AccordionSizeReturn,
  };

  return sizes?.[size] || sizes.large;
};

export default accordionSize;
