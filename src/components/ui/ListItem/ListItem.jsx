import { Box, Typography } from "@mui/material";
import React from "react";
import ListItemShape from "../Decorative/ListItemShape";
import { identifySxProp } from "@/packages/mui/theme/helpers";

/**
 * @param {import("@mui/material").BoxProps} props
 */
function ListItem(props) {
  return (
    <Box
      {...props}
      sx={(tm) => ({
        display: "flex",
        gap: "6px",
        ...identifySxProp(tm, props?.sx),
      })}
    />
  );
}

/**
 * @param {import("@mui/material").TypographyProps} props
 */
function ListItemText(props) {
  return (
    <Typography
      variant="body2"
      {...props}
      sx={(tm) => ({
        color: "text.disabled",
        ...identifySxProp(tm, props?.sx),
      })}
    />
  );
}

/**
 * @param {React.ComponentProps<typeof ListItemShape>} props
 */
function ListItemStyle(props) {
  return (
    <ListItemShape
      {...props}
      sx={(tm) => ({ mt: "8px", ...identifySxProp(tm, props?.sx) })}
    />
  );
}
export { ListItem, ListItemStyle, ListItemText };
