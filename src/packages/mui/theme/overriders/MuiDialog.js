import { alpha } from "@mui/material";

const backdropFilter = "blur(16px)";
/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiDialog"]}
 */
const MuiDialog = {
  defaultProps: {
    scroll: "body",
  },
  styleOverrides: {
    paper: {
      background: "none",
      boxShadow: "none",
    },
    backdrop: ({ theme }) => ({
      backgroundColor: alpha(theme.palette.background.surface, 0.64),
      WebkitBackdropFilter: backdropFilter,
      backdropFilter,
    }),
  },
};

export default MuiDialog;
