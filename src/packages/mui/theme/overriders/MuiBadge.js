import { notDefinedColors } from "../shades";

/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiBadge"]}
 */
const MuiBadge = {
  styleOverrides: {
    root: ({ theme }) => ({
      display: "block",
      width: "100%",
      "& .MuiBadge-badge": {
        padding: "0px 10px",
        height: "18px",
        borderRadius: "31px",
        fontSize: theme.typography.caption2.fontSize,
        fontFamily: theme.typography.caption2.fontFamily,
      },
    }),
    colorError: {
      backgroundColor: notDefinedColors["#FD5064"],
    },
  },
};

export default MuiBadge;
