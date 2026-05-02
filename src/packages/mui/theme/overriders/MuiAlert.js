/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiAlert"]}
 */
const MuiAlert = {
  styleOverrides: {
    
    root: {
      width:"fit-content",
      display: "flex",
      alignItems: "center",
      "& .MuiAlert-icon": {
        margin: "0px",
        padding: "0px",
      },

      "& .MuiAlert-message": {
        padding: "0px",
      },
    },
  },
};

export default MuiAlert;
