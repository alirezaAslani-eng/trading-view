import { SvgIcon } from "@mui/material";
import React from "react";

/**
 * @param {import('@mui/material').SvgIconProps} props
 */
function ReceiveIcon(props) {
  return (
    <SvgIcon
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.04321 9.51944L9.99993 12.4762L12.9567 9.51944"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99976 12.4762V4.59164"
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
    </SvgIcon>
  );
}

export default ReceiveIcon;
