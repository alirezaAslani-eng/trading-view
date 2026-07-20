import { SvgIcon } from "@mui/material";
import React from "react";

/**
 * @param {import('@mui/material').SvgIconProps} props
 */
function WarningIcon(props) {
  return (
    <SvgIcon
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 6.75V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.00007 16.0575H4.45507C1.85257 16.0575 0.765072 14.1975 2.02507 11.925L4.36507 7.70996L6.57007 3.74996C7.90507 1.34246 10.0951 1.34246 11.4301 3.74996L13.6351 7.71746L15.9751 11.9325C17.2351 14.205 16.1401 16.065 13.5451 16.065H9.00007V16.0575Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99609 12.75H9.00283"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default WarningIcon;
