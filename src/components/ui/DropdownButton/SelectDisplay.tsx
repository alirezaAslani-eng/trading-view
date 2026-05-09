"use client";
import { inputSize, inputTheme } from "@/packages/mui/theme/variants";
import { Box, styled } from "@mui/material";
import clsx from "clsx";
import { inputDefaultVariants } from "@/packages/mui/theme/variants";
import { InputSelectIcon } from "@/components/template/Icon";
import { SelectDisplayProps } from "../types";

const StyledSelectDisplay = styled(Box, {
  shouldForwardProp: (p) => {
    return p !== "variant" && p !== "size" && p !== "color";
  },
})<Pick<SelectDisplayProps, "variant" | "color" | "size">>(({
  theme,
  variant = inputDefaultVariants.variant,
  color = inputDefaultVariants.color,
  size = inputDefaultVariants.size,
}) => {
  const input_theme = inputTheme({
    color,
    theme,
    variant,
  });
  const input_size = inputSize({ size, theme });
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
  ...props
}: SelectDisplayProps) {
  return (
    <>
      <StyledSelectDisplay
        {...props}
        className={clsx(
          {
            "Mui-focused": focused,
            "Mui-placeholder": !isSelected,
            "Mui-error": error,
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
