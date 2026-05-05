/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiAccordion"]}
 */
const MuiAccordion = {
  defaultProps: {
    disableGutters: true,
  },
  styleOverrides: {
    root: {
      ":first-of-type": {
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
      },
      ":last-of-type": {
        borderTopRightRadius: "0px",
        borderTopLeftRadius: "0px",
      },
      backgroundColor: "transparent",
      boxShadow: "none",
      border:"none"
    },
  },
};

export default MuiAccordion;
