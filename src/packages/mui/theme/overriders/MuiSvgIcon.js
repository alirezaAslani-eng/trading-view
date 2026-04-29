/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiSvgIcon"]}
 */
const MuiSvgIcon = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: "20px",
      height: "20px",
      color: theme.palette.text.onPrimary,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fill:"none"
    }),
  },
};

export default MuiSvgIcon;
