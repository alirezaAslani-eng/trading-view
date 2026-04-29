import { SvgIcon } from "@mui/material";
import React from "react";

/**
 * @param {import('@mui/material').SvgIconProps} props
 */
function DownIcon(props) {
  return (
    <SvgIcon
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.5 5.25003C10.5 5.25003 7.92229 8.74999 6.99997 8.75C6.07766 8.75001 3.5 5.25 3.5 5.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default DownIcon;
