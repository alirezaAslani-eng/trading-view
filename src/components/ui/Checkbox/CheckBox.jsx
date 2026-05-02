"use client";
import { Box, Checkbox as MuiCheckbox, FormLabel, styled } from "@mui/material";
import React from "react";
import useRndomID from "@/hooks/app/useRndomID";
import { checkboxSize, checkboxTheme } from "@/packages/mui/theme/variants";

const StyledCheckBox = styled(MuiCheckbox, {
  shouldForwardProp: (prop) => {
    return prop !== "variant";
  },
})(({ theme, color, size, variant }) => {
  const checkbox_theme = checkboxTheme({ theme, color, variant });
  const checkbox_size = checkboxSize(size);

  return {
    background: "none !important",
    transition: "all ease 150ms",
    marginLeft: "8px",
    ...checkbox_size?.rootSize,
    ...checkbox_theme?.rootStyle,
    "&.Mui-checked": {
      ...checkbox_theme?.checkedTheme,
    },
    "&:not(.Mui-checked)": {
      ...checkbox_theme?.notCheckedTheme,
    },
  };
});
/**
 * @param {import("@mui/material").CheckboxProps & {label:import("react").ReactNode}} props
 */
function CheckBox({ label, ...props }) {
  const randomLabelID = useRndomID();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <StyledCheckBox id={randomLabelID} {...props} />
      <FormLabel htmlFor={randomLabelID}>{label}</FormLabel>
    </Box>
  );
}

export default CheckBox;
