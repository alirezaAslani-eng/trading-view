import { SvgIcon } from "@mui/material";
import React from "react";

/**
 * @param {import('@mui/material').SvgIconProps} props
 */
function SearchIcon(props) {
  return (
    <SvgIcon
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.6666 16.6667L15.3333 15.3333M3.33325 9.66667C3.33325 6.16887 6.16878 3.33333 9.66658 3.33333C13.1644 3.33333 15.9999 6.16887 15.9999 9.66667C15.9999 13.1645 13.1644 16 9.66658 16C6.16878 16 3.33325 13.1645 3.33325 9.66667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default SearchIcon;
