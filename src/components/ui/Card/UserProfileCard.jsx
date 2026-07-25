"use client";

import { Box, MenuItem, IconButton, Typography } from "@mui/material";
import { lineClamp } from "@/packages/mui/theme/helpers";
import { MenueHorizontal } from "../Icon";
import { dashboardInfoConfig, logoutConfig } from "@/packages/react-query";
import { getInitials } from "@/utils/features/user/getInitials";
import { useMutation, useQuery } from "@tanstack/react-query";
import Dropdown from "../Menu/Dropdown";
import LogoutIcon from "../Icon/Logout";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import {
  UserProfile,
  UserProfileImage,
  UserProfileInfo,
} from "@/components/ui/Profile/UserProfile";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constant/app/routes";

const queryConfig = dashboardInfoConfig();

function UserProfileCard({ collapsed = false }) {
  const router = useRouter();

  const dashboard_info = useQuery(queryConfig);

  const initials = getInitials(dashboard_info.data?.fullName);

  const logoutMutation = useMutation(
    logoutConfig({
      onSuccess: () => router.replace(ROUTES.AUTH.ROOT),
    })
  );
  // logout setting
  const profileMenu = (
    <>
      <MenuItem
        onClick={() => logoutMutation.mutate()}
        sx={{
          justifyContent: "center",
          gap: "6px",
          backgroundColor: "background.surfaceLevel4",
        }}
      >
        <Typography variant="body2" sx={{ color: "text.onPrimary" }}>
          خروج
        </Typography>

        <LogoutIcon sx={{ color: "text.primary" }} />
      </MenuItem>

      <MenuItem
        sx={{
          justifyContent: "center",
          gap: "6px",
          backgroundColor: "background.surfaceLevel4",
        }}
      >
        <Typography variant="body2" sx={{ color: "text.onPrimary" }}>
          تنظیمات
        </Typography>
      </MenuItem>
    </>
  );

  if (collapsed) {
    return (
      <Dropdown
        trigger={() => (
          <UserProfile sx={{ cursor: "pointer" }}>
            <UserProfileImage />
          </UserProfile>
        )}
      >
        {profileMenu}
      </Dropdown>
    );
  }

  return (
    <PanelPaper
      sx={{
        border: "1px solid",
        borderColor: "border.default",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pr: "8px",
        pl: "4px",
        height: "52px",
        borderRadius: "12px",
        width: "100%",
      }}
    >
      <UserProfile>
        <UserProfileImage />

        <UserProfileInfo sx={{ width: "110px" }}>
          <Typography
            variant="body3"
            sx={{ color: "text.heading", ...lineClamp(1) }}
          >
            {dashboard_info.data?.fullName}
          </Typography>

          <Typography
            variant="caption2"
            sx={{ color: "text.disabled", ...lineClamp(1) }}
          >
            {dashboard_info.data?.mobile}
          </Typography>
        </UserProfileInfo>
      </UserProfile>

      <Dropdown
        trigger={() => (
          <IconButton size="small">
            <MenueHorizontal />
          </IconButton>
        )}
      >
        {profileMenu}
      </Dropdown>
    </PanelPaper>
  );
}

export default UserProfileCard;
