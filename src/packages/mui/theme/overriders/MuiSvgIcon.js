/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiSvgIcon"]}
 */
const MuiSvgIcon = {
  defaultProps: {
    fontSize: "large",
  },
  styleOverrides: {
    root: ({ theme }) => ({
      width: "20px",
      height: "20px",
      color: theme.palette.text.onPrimary,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fill: "none",
    }),

    fontSizeLarge: {
      width: "20px",
      height: "20px",
    },
    fontSizeMedium: {
      width: "18px",
      height: "18px",
    },
    fontSizeSmall: {
      width: "14px",
      height: "14px",
    },
  },
};

export default MuiSvgIcon;
