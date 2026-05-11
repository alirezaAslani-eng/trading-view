"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Typography } from "@mui/material";
import React from "react";

/**
 * @param {import('@mui/material').TypographyProps} props
 */
function SendAuthOTP(props) {
  return (
    <>
      <Typography
        color="primary"
        variant="body3"
        {...props}
        sx={(tm) => ({
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          userSelect: "none",
          ...identifySxProp(tm, props.sx),
        })}
      >
        {true ? props.children : "timer"}
      </Typography>
    </>
  );
}

export default SendAuthOTP;
