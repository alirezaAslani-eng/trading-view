"use client";
import { brandName } from "@/constant/app/staticData";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Typography } from "@mui/material";
import React from "react";
/**
 *
 * @param {import('@mui/material').TypographyProps} props
 */
function BrandName(props) {
  const { children = brandName } = props;
  return (
    <Typography
      variant="h7"
      sx={(tm) => ({
        color: "text.onPrimary",
        letterSpacing: 4,
        textTransform: "uppercase",
        ...identifySxProp(tm, props.sx),
      })}
    >
      {children}
    </Typography>
  );
}

export default BrandName;
