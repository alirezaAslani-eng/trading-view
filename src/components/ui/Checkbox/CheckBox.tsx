"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { CheckBoxProps } from "@/components/ui/types";
import useRndomID from "@/hooks/app/useRndomID";
import {
  Box,
  Checkbox as MuiCheckbox,
  styled,
  Typography,
} from "@mui/material";
import {
  checkboxSize,
  checkboxTheme,
  defaultCheckboxVariants,
} from "@/packages/mui/theme/variants";

const StyledCheckBox = styled(MuiCheckbox, {
  shouldForwardProp: (prop) => {
    return prop !== "variant";
  },
})<Omit<CheckBoxProps, "label">>(({
  theme,
  color = defaultCheckboxVariants.color,
  size = defaultCheckboxVariants.size,
  variant = defaultCheckboxVariants.variant,
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
});

function CheckBox({ label, ...props }: CheckBoxProps) {
  const randomLabelID = useRndomID();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <StyledCheckBox
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

export default CheckBox;
