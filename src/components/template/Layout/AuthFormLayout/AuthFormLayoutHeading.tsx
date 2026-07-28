"use client";
import Button from "@/components/ui/Button/Button";
import { ArrowLeftIcon } from "@/components/ui/Icon";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { PWC } from "@/types/utils";
import { Box, IconButton, Stack, StackProps, Typography } from "@mui/material";

function AuthFormLayoutHeading({
  sx,
  subTitle,
  title,
}: Pick<StackProps, "sx"> & { subTitle?: string; title: string }) {
  return (
    <Box
      sx={(tm) => ({
        mb: "64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        color: tm.palette.text.onPrimary,
        ...identifySxProp(tm, sx),
      })}
    >
      <Stack spacing={1}>
        {/* // * ---- Title ---- */}
        <Typography variant="h5">{title}</Typography>
        {/* // * ------ subtitle ------ */}
        <Typography variant="body1">{subTitle}</Typography>
      </Stack>
      {/* <Box
        component={"button"}
        sx={{ display: "flex", alignItems: "center", gap: "4px" }}
      >
        <Typography variant="body2" sx={{ color: "text.onPrimary" }}>
          {"بازگشت"}
        </Typography>
        <ArrowLeftIcon />
      </Box> */}
    </Box>
  );
}

export default AuthFormLayoutHeading;
