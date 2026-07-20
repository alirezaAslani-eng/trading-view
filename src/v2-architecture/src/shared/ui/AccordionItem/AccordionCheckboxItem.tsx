"use client";
import { identifySxProp } from "@/design-system";
import {
  Box,
  styled,
  Typography,
  BoxProps,
  TypographyProps,
} from "@mui/material";

interface AccordionCheckboxItemStyledProps extends BoxProps {
  disableLastBorder?: boolean;
}

const AccordionCheckboxItem = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "disableLastBorder";
  },
})<AccordionCheckboxItemStyledProps>(({ theme, disableLastBorder }) => {
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

function AccordionCheckboxLabel(props: TypographyProps<"label">) {
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
