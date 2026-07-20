"use client";
import { legacyColors } from "@/packages/mui/theme/shades";
import { Box, styled } from "@mui/material";

const StyledDropdownButton = styled(Box, {
  shouldForwardProp: (prop) => {
    return (
      !!(prop !== "variant") ||
      !!(prop !== "color") ||
      !!(prop !== "active") ||
      !!(prop !== "size")
    );
  },
})(
  ({
    theme,
    // * --- Custom props ---
    variant = "text",
    color = "nuteral",
    size = "large",
    active = false,
  }) => ({
    display: "flex",
    alignItems: "center",
    ...dropdownButtonTheme({ active, color, theme, variant }),
    ...dropdownButtonSizes(theme, size),
  })
);

function dropdownButtonTheme({ theme, variant, color, active }) {
  // * ---- Neuteral Theme ----
  if (color === "nuteral") {
    if (variant === "text") {
      // * --- active state ----
      if (active) {
        return {
          backgroundColor: legacyColors["#2F2F31"],
          color: theme.palette.text.heading,
        };
      }
      return {
        backgroundColor: "transparent",
        color: theme.palette.text.heading,
      };
    }
  }
}

function dropdownButtonSizes(theme, size) {
  if (size === "large") {
    return {
      padding: "0px 15px",
      height: "42px",
      borderRadius: "12px",
      fontSize: theme.typography.button3?.fontSize,
      fontFamily: theme.typography.button3?.fontFamily,
      lineHeight: theme.typography.button3?.lineHeight,
    };
  }
}

/**
 * @param {React.ComponentProps<typeof StyledDropdownButton> & {variant:string,color:string,size:string,active:boolean}} props
 */
function DropdownButton(props) {
  return <StyledDropdownButton {...props} />;
}

export default DropdownButton;
