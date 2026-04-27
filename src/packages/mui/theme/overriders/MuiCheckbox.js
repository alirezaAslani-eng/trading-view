import { SvgIcon } from "@mui/material";
import CheckedIcon from "@/assets/svg/checked.svg";
import { notDefinedColors } from "../shades";

/**
 * @type {import("@mui/material").Components<import("@mui/material").Theme>["MuiCheckbox"]}
 */
const MuiCheckbox = {
  defaultProps: {
    checkedIcon: (
      <SvgIcon sx={{ width: "12px", height: "12px", color: "text.heading" }}>
        <CheckedIcon />
      </SvgIcon>
    ),
    icon: <span></span>,
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      background: "none !important",
      transition: "all ease 150ms",
      ...checkboxTheme(theme, ownerState),
    }),
    sizeMedium: {
      width: "28px",
      height: "28px",
      borderRadius: "8px",
      padding: "0px",
    },
  },
};

export default MuiCheckbox;

function checkboxTheme(theme, ownerState) {
  const color = ownerState?.color;

  if (color === "primary") {
    return {
      border: "1px solid",
      "&.Mui-checked": {
        color: theme.palette.text.onPrimary,
        backgroundColor: `${theme.palette.background.primary} !important`,
        borderColor: "transparent",
      },
      "&:not(.Mui-checked)": {
        color: theme.palette.text.onPrimary,
        backgroundColor: `${notDefinedColors["#282828"]} !important`,
        borderColor: notDefinedColors["#474747"],
      },
    };
  }
}
