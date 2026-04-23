"use client";
import { Box, Checkbox, FormLabel, Typography } from "@mui/material";
import React from "react";
import useRndomID from "@/hooks/app/useRndomID";
/**
 *
 * @param {import("@mui/material").CheckboxProps & {label:import("react").ReactNode}} props
 */
function CheckBox({ label, ...props }) {
  const randomLabelID = useRndomID();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Checkbox id={randomLabelID} />
      <FormLabel htmlFor={randomLabelID}>{label}</FormLabel>
    </Box>
  );
}

export default CheckBox;
