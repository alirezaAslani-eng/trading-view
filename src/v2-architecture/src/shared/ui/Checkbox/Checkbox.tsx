"use client";
import { useId } from "react";
import { checkboxSize, checkboxTheme } from "./styles";
import { CheckboxProps } from "./types";
import {
  Box,
  Checkbox as MuiCheckbox,
  styled,
  Typography,
} from "@mui/material";
import { identifySxProp } from "@/v2-architecture/src/design-system";

const checkboxDefaults = {
  variant: "contained",
  color: "primary",
  size: "medium",
} as const;

const StyledCheckbox = styled(MuiCheckbox, {
  shouldForwardProp: (prop) => {
    return !["variant"].includes(prop as any);
  },
})<Omit<CheckboxProps, "label">>(
  ({
    theme,
    color = checkboxDefaults.color,
    size = checkboxDefaults.size,
    variant = checkboxDefaults.variant,
  }) => {
    const checkbox_theme = checkboxTheme({ theme, color, variant });
    const checkbox_size = checkboxSize({ size });

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
  }
);

function Checkbox({ label, ...props }: CheckboxProps) {
  const randomLabelID = useId();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <StyledCheckbox
        id={randomLabelID}
        {...props}
        sx={(tm) => ({
          ...(!label && { ml: "0px" }),
          ...identifySxProp(tm, props?.sx),
        })}
      />
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

export default Checkbox;
