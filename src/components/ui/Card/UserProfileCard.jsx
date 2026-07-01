"use client";
import { Box, Typography, MenuItem, IconButton } from "@mui/material";
import { lineClamp } from "@/packages/mui/theme/helpers";
import { MenueHorizontal } from "../Icon";
import { dashboardInfoConfig } from "@/packages/react-query";
import { getInitials } from "@/utils/features/user/getInitials";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "../Menu/Dropdown";
import LogoutIcon from "../Icon/Logout";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import {
  UserProfile,
  UserProfileImage,
  UserProfileInfo,
} from "@/components/ui/Profile/UserProfile";

const queryConfig = dashboardInfoConfig();

function UserProfileCard({ collapsed = false }) {
  const dashboard_info = useQuery(queryConfig);
  const initials = getInitials(dashboard_info.data?.fullName);

  if (collapsed) {
    return (
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
      </UserProfile>
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

      <Dropdown
        trigger={() => (
          <IconButton size="small">
            <MenueHorizontal />
          </IconButton>
        )}
      >
        <MenuItem
          onClick={() => console.log("logout")}
          sx={{
            justifyContent: "center",
            textAlign: "center",
            gap: "6px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "text.onPrimary", textAlign: "center" }}
          >
            خروج
          </Typography>
          <LogoutIcon sx={{ color: "text.primary", textAlign: "center" }} />
        </MenuItem>
      </Dropdown>
    </PanelPaper>
  );
}

export default UserProfileCard;
