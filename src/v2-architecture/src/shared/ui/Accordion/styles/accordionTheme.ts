import { AccordionThemeProps, AccordionThemeReturn } from "./types";

const accordionTheme = ({
  variant,
  color,
  theme,
}: AccordionThemeProps): AccordionThemeReturn => {
  const styles = {
    nuteral: {
      contained: {
        expandIconTheme: { color: theme.palette.text.onPrimary },
        contentTheme: { color: theme.palette.text.onPrimary },
        contentIconTheme: { color: theme.palette.text.onPrimary },
        contentIconExpandedTheme: { color: theme.palette.text.primary2 },
        summaryTheme: {
          backgroundColor: theme.palette.background.surface,
          borderColor: theme.palette.border.default,
          borderStyle: "solid",
        },
      } satisfies AccordionThemeReturn,
    },
  };

  return styles?.[color]?.[variant] || styles.nuteral.contained;
};

export default accordionTheme;
