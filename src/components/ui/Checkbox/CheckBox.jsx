"use client";
import { Box, Checkbox, FormLabel, Typography } from "@mui/material";
import React from "react";
import useRndomID from "@/hooks/app/useRndomID";
import { identifySxProp } from "@/packages/mui/theme/helpers";
/**
 *
 * @param {import("@mui/material").CheckboxProps & {label:import("react").ReactNode}} props
 */
function CheckBox({ label, ...props }) {
  const randomLabelID = useRndomID();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Checkbox
        id={randomLabelID}
        {...props}
        sx={(tm) => ({
          ml: "8px",
          ...identifySxProp(tm, props.sx),
        })}
      />
      <FormLabel htmlFor={randomLabelID}>{label}</FormLabel>
    </Box>
  );
}

export default CheckBox;
