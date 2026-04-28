/**
 * @returns {{rootStyle:object,selected:object,notSelected:object}}
 */
function toggleButtonGroupTheme({ theme, color, variant }) {
  const styles = {
    primary: {
      contained: {
        selected: {
          backgroundColor: `${theme.palette.background.primary} !important`,
          color: `${theme.palette.text.onPrimary} !important`,
        },
        notSelected: {
          background: `transparent !important`,
          color: theme.palette.text.onPrimary,
        },
      },
    },
    success: {
      contained: {
        rootStyle: {
          backgroundColor: theme.palette.background.surface,
        },
        notSelected: {
          backgroundColor: "transparent",
          color: theme.palette.text.disabled,
        },
        selected: {
          backgroundColor: `${theme.palette.background.buy} !important`,
          color: `${theme.palette.text.onPrimary} !important`,
        },
      },
    },
    nuteral: {
      contained: {
        rootStyle: {
          backgroundColor: theme.palette.background.surface,
        },
        notSelected: {
          backgroundColor: `transparent`,
          color: theme.palette.text.linkSecondary,
        },
        selected: {
          backgroundColor: `${theme.palette.background.toggleActive} !important`,
          color: theme.palette.text.onPrimary,
        },
      },
    },
  };

  return styles?.[color]?.[variant] || styles.primary.contained;
}

export default toggleButtonGroupTheme;
