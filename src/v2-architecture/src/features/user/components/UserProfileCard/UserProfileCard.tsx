"use client";

import {
  Box,
  Menu,
  MenuItem,
  Typography,
  ButtonBase,
  Divider,
  Stack,
  styled,
} from "@mui/material";
import { lineClamp } from "@/packages/mui/theme/helpers";
import {
  LockIcon,
  NotificationIcon,
  SettingIcon,
  SortIcon,
  UserIcon,
  LogoutIcon,
} from "@/components/ui/Icon";
import { dashboardInfoConfig, logoutConfig } from "@/packages/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  UserProfile,
  UserProfileImage,
  UserProfileInfo,
} from "@/components/ui/Profile/UserProfile";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/constant/app/routes";
import useMuiMenuState from "@/hooks/app/useMuiMenuState";

const queryConfig = dashboardInfoConfig();

function UserProfileCard({ collapsed = false }) {
  const { anchoreEl, isOpenMenu, closeMenu, openMenu } = useMuiMenuState();

  const router = useRouter();

  const dashboard_info = useQuery(queryConfig);

  const logoutMutation = useMutation(
    logoutConfig({
      onSuccess: () => {
        closeMenu();
        router.replace(ROUTES.AUTH.ROOT);
      },
    }),
  );

  return (
    <>
      <ButtonBase
        onClick={openMenu}
        sx={{
          border: "1px solid",
          borderColor: "border.default",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 2.5,
          pl: 2,
          height: "52px",
          borderRadius: "12px",
          width: "100%",
          backdropFilter: "blur(12px)",
          color: "text.secondary",
        }}
      >
        <UserProfile>
          <UserProfileImage />

          {!collapsed && (
            <UserProfileInfo sx={{ width: "110px" }}>
              <Typography
                variant="body3"
                sx={{
                  color: "text.heading",
                  ...lineClamp(1),
                }}
              >
                {dashboard_info.data?.fullName}
              </Typography>

              <Typography
                variant="caption2"
                sx={{
                  color: "text.disabled",
                  ...lineClamp(1),
                }}
              >
                {dashboard_info.data?.mobile}
              </Typography>
            </UserProfileInfo>
          )}
        </UserProfile>

        {!collapsed && <SortIcon />}
      </ButtonBase>

      <Menu
        anchorEl={anchoreEl}
        open={isOpenMenu}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            p: 2,
            minWidth: "220px",
            backgroundColor: "background.inputModal",
            borderRadius: 4,
          }}
        >
          {/* Header */}
          <UserProfile>
            <UserProfileInfo>
              <Typography
                variant="body3"
                sx={{
                  color: "text.heading",
                }}
              >
                {dashboard_info.data?.fullName}
              </Typography>

              <Typography
                variant="caption2"
                sx={{
                  color: "text.tertiary",
                }}
              >
                {dashboard_info.data?.mobile}
              </Typography>
            </UserProfileInfo>
          </UserProfile>

          <Divider sx={{ my: 1 }} />

          <Stack>
            {/* Profile */}
            <StyledMenuItem onClick={closeMenu}>
              <UserIcon />

              <Typography
                component={Link}
                href={ROUTES.PROFILE.ROOT}
                variant="button4"
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                }}
              >
                پروفایل من
              </Typography>
            </StyledMenuItem>
            {/* Account Settings */}
            <StyledMenuItem onClick={closeMenu}>
              <SettingIcon />

              <Typography
                component={Link}
                href={ROUTES.PROFILE.SETTING}
                variant="button4"
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                }}
              >
                تنظیمات حساب
              </Typography>
            </StyledMenuItem>
            {/* Notifications */}
            <StyledMenuItem onClick={closeMenu}>
              <NotificationIcon />

              <Typography
                component={Link}
                href={ROUTES.PROFILE.NOTIFICATIONS}
                variant="button4"
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                }}
              >
                اعلان‌ها
              </Typography>
            </StyledMenuItem>
          </Stack>

          <Divider sx={{ my: 1 }} />

          {/* Logout */}
          <MenuItem
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            sx={{
              minHeight: "auto",
              borderRadius: 1.5,
              px: 1.5,
              py: 1.25,
              gap: 1.5,

              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.06)",
              },

              "&.Mui-disabled": {
                opacity: 0.6,
              },
            }}
          >
            <LogoutIcon
              sx={{
                fontSize: 20,
                color: "status.loss",
              }}
            />

            <Typography
              variant="button4"
              sx={{
                color: "status.loss",
              }}
            >
              خروج از حساب
            </Typography>
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
}

export { UserProfileCard };

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  minHeight: "auto",
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1.25, 1.5),
  gap: theme.spacing(1.5),
  color: theme.palette.text.primary,

  "&:hover": {
    backgroundColor: theme.palette.background.surfaceLevel4,
  },
}));
