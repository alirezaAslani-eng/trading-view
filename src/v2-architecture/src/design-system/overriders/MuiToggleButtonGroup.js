/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiToggleButtonGroup"]}
 */
const MuiToggleButtonGroup = {
  defaultProps: {
    dir: "rtl",
    exclusive: true,
  },

  styleOverrides: {
    root: {
      height: "fit-content",
      alignItems: "center",
    },
  },
};

export default MuiToggleButtonGroup;
