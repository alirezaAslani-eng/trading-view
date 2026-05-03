"use client";
import {
  Box,
  Checkbox as MuiCheckbox,
  FormLabel,
  styled,
  Typography,
} from "@mui/material";
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
 * @param {import("@mui/material").CheckboxProps & {label:string}} props
 */
function CheckBox({ label, ...props }) {
  const randomLabelID = useRndomID();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <StyledCheckBox id={randomLabelID} {...props} />
      {label && (
        <Typography
          component={"label"}
          variant="button2"
          sx={{ color: "text.secondary" }}
          htmlFor={randomLabelID}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
}

export default CheckBox;
