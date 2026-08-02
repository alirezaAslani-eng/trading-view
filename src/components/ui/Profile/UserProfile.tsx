import { Box, BoxProps, Stack, StackProps, Typography } from "@mui/material";
import NextImage from "../Image/NextImage";
import { useState } from "react";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { useQuery } from "@tanstack/react-query";
import { dashboardInfoConfig } from "@/packages/react-query";
import { userAvatarConfig } from "@/v2-architecture/src/features/user/react-query";

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
function UserProfileImage(props: ReplaceSxWithSxOnlyObject<BoxProps>) {
  const dashboardQuery = useQuery(dashboardInfoConfig());
  const avatarQuery = useQuery(userAvatarConfig());
  const [isError, setIsError] = useState(false);

  const { fullName } = dashboardQuery.data || {};
  const avatarUrl = avatarQuery.data;

  return (
    <Box
      {...props}
      sx={{ width: "32px", height: "32px", position: "relative", ...props.sx }}
    >
      {/* // --- Profile --- */}
      {!!avatarUrl && !isError && (
        <NextImage
          fill
          sizes="100px"
          quality={100}
          src={avatarUrl}
          alt="User profile"
          sx={{ objectFit: "cover", borderRadius: "999px" }}
          onError={() => setIsError(true)}
        />
      )}
      {/* // --- Profile --- */}

      {/* // --- Fallback --- */}
      {(!!!avatarUrl || isError) && (
        <AvatarFallback fullName={fullName ?? ""} />
      )}
      {/* // --- Fallback --- */}
    </Box>
  );
}

function UserProfileInfo(boxProps: ReplaceSxWithSxOnlyObject<StackProps>) {
  return <Stack {...boxProps} sx={{ gap: "6px", ...boxProps.sx }} />;
}

export { UserProfile, UserProfileImage, UserProfileInfo };

function AvatarFallback({ fullName }: { fullName: string }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "999px",
        backgroundColor: "background.primary",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: "text.onPrimary", userSelect: "none" }}
      >
        {getInitials(fullName)}
      </Typography>
    </Box>
  );
}

export function getInitials(fullName?: string): string {
  if (!fullName) return "";

  return fullName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((item: string) => item.charAt(0))
    .slice(0, 1)
    .join(" ")
    .toUpperCase();
}
