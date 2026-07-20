/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiButton"]}
 */
const MuiButton = {
  styleOverrides: {
    root: {
      textTransform: "none",
      border: "none",
      backgroundColor: "transparent",
      ":hover": {
        backgroundColor: undefined,
        boxShadow: undefined,
      },
    },
  },
};

export default MuiButton;
