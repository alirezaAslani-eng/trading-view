/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiSvgIcon"]}
 */
const MuiSvgIcon = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: "20px",
      height: "20px",
      color: theme.palette.text.heading,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
  },
};

export default MuiSvgIcon;
