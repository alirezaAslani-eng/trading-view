import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Box } from "@mui/material";
import React from "react";

/**
 * @param {{sx:import('@mui/material').BoxProps["sx"]}} props
 */
function FakeIcon({ sx }) {
  return (
    <Box
      sx={(tm) => ({
        width: "20px",
        height: "20px",
        backgroundColor: "red",
        ...identifySxProp(tm, sx),
      })}
    ></Box>
  );
}

export default FakeIcon;
