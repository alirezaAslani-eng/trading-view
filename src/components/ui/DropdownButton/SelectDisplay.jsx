"use client";
import { inputSize, inputTheme } from "@/packages/mui/theme/style-generator";
import { Box, styled } from "@mui/material";
import { ComponentProps } from "react";
import { DownIcon } from "../Icon";

const StyledSelectDisplay = styled(Box, {
  shouldForwardProp: (p) => {
    return (
      p !== "variant" &&
      p !== "size" &&
      p !== "color" &&
      p !== "focused" &&
      p !== "error" &&
      p !== "isSelected"
    );
  },
})(({
  theme,
  variant = "contained",
  color = "primary",
  size = "medium",
  error,
  focused = false,
  isSelected,
}) => {
  const input_theme = inputTheme({
    color,
    theme,
    variant,
    error,
  });
  const input_size = inputSize({ size, theme });
  return {
    ...input_theme?.rootTheme,
    ...input_size?.rootSize,
    // * focused theme
    ...(focused && input_theme?.focusTheme),
    ...(!isSelected && input_theme.placeholderTheme),
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
function SelectDisplay({ children, downIcon, upIcon, focused, ...props }) {
  return (
    <>
      <StyledSelectDisplay {...props} focused={focused}>
        <Box>{children}</Box>
        <Box>
          {focused
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