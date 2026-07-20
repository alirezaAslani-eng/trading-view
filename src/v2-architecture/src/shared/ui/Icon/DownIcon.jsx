import { SvgIcon } from "@mui/material";
import React from "react";

/**
 * @param {import('@mui/material').SvgIconProps} props
 */
function DownIcon(props) {
  return (
    <SvgIcon
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.9396 6.71249L10.0496 11.6025C9.47207 12.18 8.52707 12.18 7.94957 11.6025L3.05957 6.71249"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default DownIcon;
