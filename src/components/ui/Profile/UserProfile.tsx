import { Box, BoxProps, Stack, StackProps } from "@mui/material";
import NextImage from "../Image/NextImage";
import { ComponentProps } from "react";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";

function UserProfile(boxProps: ReplaceSxWithSxOnlyObject<BoxProps>) {
  return (
    <Box
      {...boxProps}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        ...boxProps.sx,
      }}
    />
  );
}
function UserProfileImage(
  imageProps: Partial<
    ReplaceSxWithSxOnlyObject<ComponentProps<typeof NextImage>>
  >,
) {
  return (
    // @ts-ignore
    <NextImage
      width={32}
      height={32}
      {...imageProps}
      sx={{ objectFit: "cover", ...imageProps.sx }}
    />
  );
}

function UserProfileInfo(boxProps: ReplaceSxWithSxOnlyObject<StackProps>) {
  return <Stack {...boxProps} sx={{ gap: "6px", ...boxProps.sx }} />;
}

export { UserProfile, UserProfileImage, UserProfileInfo };
