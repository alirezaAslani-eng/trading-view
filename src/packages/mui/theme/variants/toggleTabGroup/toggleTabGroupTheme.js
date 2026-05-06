/**
 * @returns {{rootStyle:object,selectedTab:object,notSelectedTab:object}}
 */
function toggleTabGroupTheme({ theme, color, variant }) {
  const styles = {
    nuteral: {
      contained: {
        rootStyle: {
          backgroundColor: theme.palette.background.surface,
        },
        notSelectedTab: {
          backgroundColor: `transparent`,
          color: theme.palette.text.linkTertiary,
        },
        selectedTab: {
          background: `transparent !important`,
          color: `${theme.palette.text.onPrimary} !important`,
        },
      },
    },
  };

  return styles?.[color]?.[variant] || styles.nuteral.contained;
}

export default toggleTabGroupTheme;
