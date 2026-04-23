"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { Stack, Typography } from "@mui/material";
/**
 * @param {{sx:import("@mui/material").StackProps["sx"],title:string,subTitle:string}} p0
 */
function AuthFormLayoutHeading({ sx, subTitle, title }) {
  return (
    <Stack
      sx={(tm) => ({
        textAlign: "center",
        mb: "64px",
        color: tm.palette.text.onPrimary,
        gap: "8px",
        ...identifySxProp(tm, sx),
      })}
    >
      {/* // * ---- Title ---- */}
      <Typography variant="h5">{title}</Typography>
      {/* // * ------ subtitle ------ */}
      <Typography variant="body1">{subTitle}</Typography>
    </Stack>
  );
}

export default AuthFormLayoutHeading;

