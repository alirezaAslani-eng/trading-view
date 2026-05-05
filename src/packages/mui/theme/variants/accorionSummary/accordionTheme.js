/**
 * @return {{summaryTheme?:object,expandIconTheme?:object,contentIconTheme?:object,contentIconExpandedTheme?:object,contentTheme:object}} param0
 */
const accordionTheme = ({ variant, color, theme }) => {
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
      },
    },
  };

  return styles?.[color]?.[variant] || styles.nuteral.contained;
};

export default accordionTheme;
