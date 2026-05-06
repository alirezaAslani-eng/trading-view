"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Box, styled, Typography } from "@mui/material";
import React from "react";

const AccordionCheckboxItem = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "disableLastBorder";
  },
})(({ theme, disableLastBorder }) => {
  const { palette } = theme;
  return {
    padding: "14px 4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid",
    borderColor: palette.border.dark,
    ":last-of-type": {
      borderColor: "transparent",
    },
  };
});

/**
 * @param {import("@mui/material").TypographyProps<"label">} props
 */
function AccordionCheckboxLabel(props) {
  return (
    <Typography
      component={"label"}
      variant="body2"
      {...props}
      sx={(tm) => {
        return {
          color: "text.onPrimary",
          ...identifySxProp(tm, props.sx),
        };
      }}
    />
  );
}

export { AccordionCheckboxItem, AccordionCheckboxLabel };
