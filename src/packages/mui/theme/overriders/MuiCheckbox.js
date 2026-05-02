import { SvgIcon } from "@mui/material";
import CheckedIcon from "@/assets/svg/checked.svg";

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
};

export default MuiCheckbox;
