"use client";
import { inputDisabled, inputSize, inputTheme } from "../shared/input";
import { Box, styled } from "@mui/material";
import clsx from "clsx";
import { InputSelectIcon } from "@/shared/components/ui/Icon/templateIconIndex";
import { SelectDisplayProps } from "../types";
import { inputDefaults } from "../shared/input";

const StyledSelectDisplay = styled(Box, {
  shouldForwardProp: (p) => {
    return p !== "variant" && p !== "size" && p !== "color";
  },
})<Pick<SelectDisplayProps, "variant" | "color" | "size">>(({
  theme,
  variant = inputDefaults.variant,
  color = inputDefaults.color,
  size = inputDefaults.size,
}) => {
  const input_size = inputSize({ size, theme });
  const disabled_theme = inputDisabled({ color, theme, variant });
  const input_theme = inputTheme({ color, theme, variant });
  return {
    ...input_theme?.rootTheme,
    ...input_size?.rootSize,

    "&.Mui-focused": {
      ...input_theme?.focusTheme,
    },

    "&.Mui-error": {
      ...input_theme?.errorTheme,
    },

    "&.Mui-placeholder": {
      ...input_theme?.placeholderTheme,
      ...input_size?.placeholderSize,
    },
    "&.Mui-disabled": {
      ...disabled_theme.rootTheme,
      ...disabled_theme.placeholderTheme,
    },
    "&.Mui-disabled .MuiSvgIcon-root": {
      ...disabled_theme.placeholderTheme,
    },

    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  };
});

/**
 */
function SelectDisplay({
  children,
  focused,
  isSelected,
  error,
  disabled,
  ...props
}: SelectDisplayProps) {
  return (
    <>
      <StyledSelectDisplay
        {...props}
        className={clsx(
          {
            "Mui-focused": disabled ? false : focused,
            "Mui-placeholder": !isSelected,
            "Mui-error": error,
            "Mui-disabled": disabled,
          },
          props?.className,
        )}
      >
        <Box sx={{ width: "100%", minWidth: "0px" }}>{children}</Box>
        <Box>
          <InputSelectIcon focused={focused} variant={props.variant} />
        </Box>
      </StyledSelectDisplay>
    </>
  );
}
export default SelectDisplay;
