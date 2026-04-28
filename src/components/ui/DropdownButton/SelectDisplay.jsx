"use client";
import { inputSize, inputTheme } from "@/packages/mui/theme/style-generator";
import { Box, styled } from "@mui/material";
import { ComponentProps } from "react";
import { DownIcon } from "../Icon";
import clsx from "clsx";

const StyledSelectDisplay = styled(Box, {
  shouldForwardProp: (p) => {
    return p !== "variant" && p !== "size" && p !== "color";
  },
})(({ theme, variant = "contained", color = "primary", size = "medium" }) => {
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
 * @param {ComponentProps<typeof StyledSelectDisplay} props
 */
function SelectDisplay({ children, downIcon, upIcon, ...props }) {
  return (
    <>
      <StyledSelectDisplay
        {...props}
        className={clsx(
          {
            "Mui-focused": props.focused,
            "Mui-placeholder": !props.isSelected,
            "Mui-error": props.error,
          },
          props?.className,
        )}
      >
        <Box>{children}</Box>
        <Box>
          {props.focused
            ? (downIcon ?? <DownIcon sx={{ transform: "rotate(180deg)" }} />)
            : (upIcon ?? <DownIcon />)}
        </Box>
      </StyledSelectDisplay>
    </>
  );
}
export default SelectDisplay;

// * select input <- sx / variant / color / size / error
// * dropdown box <- select input <- focus / error / isSelected
