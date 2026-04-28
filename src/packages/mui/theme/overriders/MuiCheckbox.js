import { SvgIcon } from "@mui/material";
import CheckedIcon from "@/assets/svg/checked.svg";
import { notDefinedColors } from "../shades";
import { checkboxTheme } from "../variants";

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
    root: ({ theme, ownerState }) => {
      const checkbox_theme = checkboxTheme({ theme, color: ownerState.color });
      return {
        background: "none !important",
        transition: "all ease 150ms",
        ...checkbox_theme?.rootStyle,
        "&.Mui-checked": {
          ...checkbox_theme?.checkedTheme,
        },
        "&:not(.Mui-checked)": {
          ...checkbox_theme?.notCheckedTheme,
        },
      };
    },
    sizeMedium: {
      width: "28px",
      height: "28px",
      borderRadius: "8px",
      padding: "0px",
    },
  },
};

export default MuiCheckbox;
