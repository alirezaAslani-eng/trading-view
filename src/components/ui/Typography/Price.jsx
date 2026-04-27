"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Box, Typography } from "@mui/material";
import React from "react";

/**
 * @param {import('@mui/material').BoxProps} props
 */
function Price(props) {
  return (
    <Box
      {...props}
      sx={(tm) => ({
        display: "flex",
        alignItems: "center",
        color: "text.secondary",
        gap: "8px",
        ...identifySxProp(tm, props.sx),
      })}
    >
      {props.children}
    </Box>
  );
}

/**
 * @param {import('@mui/material').TypographyProps} props
 */
function PriceAmount(props) {
  return (
    <Typography variant="h7" {...props}>
      {props.children}
    </Typography>
  );
}

/**
 * @param {import('@mui/material').TypographyProps} props
 */
function PriceUnit(props) {
  return (
    <Typography variant="button3" {...props}>
      {props.children ?? "تومان"}
    </Typography>
  );
}

export { Price, PriceAmount, PriceUnit };
