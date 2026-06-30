"use client";

import { Box, MenuItem, Typography } from "@mui/material";
import { lineClamp } from "@/packages/mui/theme/helpers";
import {
  UserProfile,
  UserProfileImage,
  UserProfileInfo,
} from "@/components/ui/Profile/UserProfile";
import { MenueHorizontal } from "../Icon";
import { dashboardInfoConfig } from "@/packages/react-query";
import { getInitials } from "@/utils/features/user/getInitials";
import { useQuery } from "@tanstack/react-query";
import InputSelectMenu from "@/components/ui/Input/InputSelect/InputSelectMenu"
import { useInputSelectController } from "@/context/app/InputSelectController";

const queryConfig = dashboardInfoConfig();

function UserProfileCard({ collapsed = false }) {
  const dashboard_info = useQuery(queryConfig);
  const initials = getInitials(dashboard_info.data?.fullName);

  const { setAnchoreEl } = useInputSelectController();

  const handleLogout = () => {
    // logout
  };

  const handleAddImage = () => {
    // add image
  };


  if (collapsed) {
    return (
      <UserProfile>
        <UserProfileImage
          src="/images/person.png"
          alt="My profile"
          sx={{ width: 36, height: 36 }}
        />
      </UserProfile>
    );
  }


  return (
    <Box
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
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "background.primary",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.onPrimary" }}>
            {initials}
          </Typography>
        </Box>
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
      <MenueHorizontal />
    </Box>
  );
}

export default UserProfileCard;