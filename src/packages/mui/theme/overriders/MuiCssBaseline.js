/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiCssBaseline"]}
 */
const MuiCssBaseline = {
  styleOverrides: {
    li: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    ul: {
      padding: 0,
      margin: 0,
    },
    input: {
      border: "none",
      backgroundColor: "transparent",
      outline: "none",
    },
  },
};

export default MuiCssBaseline;
