import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Box, BoxProps, Stack, Typography } from "@mui/material";
import CircleBox from "../Box/CircleBox";
import { ReactNode } from "react";

function UserProfileItemCard(boxProps: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...boxProps}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        backgroundColor: "background.surfaceLevel4",
        borderRadius: "18px",
        p: "18px 12px",
        ...boxProps.sx,
      }}
    />
  );
}

interface UserProfileItemInfoProps {
  title?: string;
  subTitle?: string;
  icon?: ReactNode;
}
function UserProfileItemInfo({
  title,
  subTitle,
  icon,
}: UserProfileItemInfoProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <CircleBox
        sx={{
          backgroundColor: "background.inputModal",
          width: "44px",
          "& .MuiSvgIcon-root": {
            color: "text.linkSecondary",
          },
        }}
      >
        {icon}
      </CircleBox>
      <Stack spacing={2}>
        <Typography variant="body2" sx={{ color: "text.onPrimary" }}>
          {title}
        </Typography>
        <Typography variant="body3" sx={{ color: "text.tertiary" }}>
          {subTitle}
        </Typography>
      </Stack>
    </Box>
  );
}

export { UserProfileItemCard, UserProfileItemInfo };
