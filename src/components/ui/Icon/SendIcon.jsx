import { SvgIcon } from "@mui/material";
import React from "react";

/**
 * @param {import('@mui/material').SvgIconProps} props
 */
function SendIcon(props) {
  return (
    <SvgIcon {...props}>
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.04321 7.54839L9.99993 4.59167L12.9567 7.54839"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99976 4.59167V12.4763"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.08643 14.4474C7.92031 15.7287 12.0794 15.7287 15.9133 14.4474"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

export default SendIcon;
