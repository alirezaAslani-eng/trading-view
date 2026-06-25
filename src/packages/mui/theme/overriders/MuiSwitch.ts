import { Components, Theme } from "@mui/material/styles";

export const MuiSwitch = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: 35,
      height: 19,
      padding: 0,
      "& .MuiSwitch-switchBase": {
        padding: "2.5px",
        transitionDuration: "200ms",
        "&.Mui-checked": {
          transform: "translateX(16px)",
          "&  .MuiSwitch-track": {
            backgroundColor: theme.palette.background.primary,
            opacity: 1,
          },
        },
      },
      "& .MuiSwitch-thumb": {
        width: "14px",
        height: "14px",
        boxShadow: "none",
        backgroundColor: theme.palette.common.white,
      },
      "& .MuiSwitch-track": {
        borderRadius: 9,
        backgroundColor: "#4F4F4F",
        opacity: 1,
      },
    }),
  },
} satisfies Components<Theme>["MuiSwitch"];
export default MuiSwitch;
