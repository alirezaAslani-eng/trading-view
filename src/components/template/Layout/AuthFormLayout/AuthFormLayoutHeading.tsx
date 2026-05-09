"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { PWC } from "@/types/utils";
import { Stack, StackProps, Typography } from "@mui/material";

function AuthFormLayoutHeading({
  sx,
  subTitle,
  title,
}: Pick<StackProps, "sx"> & { subTitle?: string; title: string }) {
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
