"use client";

import { useState } from "react";

import { identifySxProp } from "@/packages/mui/theme/helpers";
import InputMarker from "@/components/ui/Marker/InputMarker";
import LogoutIcon from "@/components/ui/Icon/Logout";
import { useMutation } from "@tanstack/react-query";
import { logoutConfig } from "@/packages/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constant/app/routes";
import ToggleButtonGroup from "@/components/ui/ButtonGroup/ToggleButtonGroup";

import {
  FlaskIcon,
  MenuIcon,
  ScanFaceIcon,
  UserIcon,
} from "@/components/ui/Icon";

import { useTradeMode } from "@/context/feature/trade/TradeMode";
import useKycGuard from "@/hooks/features/kyc/useKycGuard";
import { KYC_LEVELS } from "@/constant/features/kyc/kycLevelOreder";

import InputText from "@/components/ui/Input/InputText";
import SearchIcon from "@/assets/svg/search-icon.svg";

import { NotificationsPopover } from "@/v2-architecture/src/features/notification";

import {
  Box,
  BoxProps,
  IconButton,
  Stack,
  SvgIcon,
  SxProps,
  Theme,
  ToggleButton,
  Typography,
} from "@mui/material";

import NextLink from "@/components/ui/Link/NextLink";
import { responsiveIconSize } from "@/packages/mui/theme/overriders";

import { NavigationDrawer } from "@/Layout/NavigationDrawer";

interface PageHeaderProps extends Pick<BoxProps, "sx"> {
  title: string;
  subtitle: string;
}

const iconSize = responsiveIconSize({
  xs: "x-large",
});

function PageHeader({ sx, title, subtitle }: PageHeaderProps) {
  const router = useRouter();

  // =========================
  // Navigation Drawer State
  // =========================

  const [navigationDrawerOpen, setNavigationDrawerOpen] = useState(false);

  const logoutMutation = useMutation(
    logoutConfig({
      onSuccess: () => router.replace(ROUTES.AUTH.ROOT),
    }),
  );

  return (
    <>
      <Box
        sx={(tm) => ({
          display: "flex",
          justifyContent: "space-between",
          ...identifySxProp(tm, sx),
        })}
      >
        {/* =========================
            Left Side
        ========================= */}

        <Box component="aside">
          <Typography
            variant="h2"
            sx={{
              color: "text.heading",
              display: { xs: "none" },
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.heading",
              mt: "4px",
              display: { xs: "none" },
            }}
          >
            {subtitle}
          </Typography>

          {/* =========================
              Menu Button
          ========================= */}

          <IconButton onClick={() => setNavigationDrawerOpen(true)}>
            <MenuIcon sx={iconSize} />
          </IconButton>
        </Box>

        {/* =========================
            Right Side
        ========================= */}

        <Stack
          direction="row"
          component="aside"
          sx={{
            alignItems: "center",
            gap: { xs: "12px" },
          }}
        >
          {/* =========================
              Demo Switcher
          ========================= */}

          <DemoSwitcher />

          {/* =========================
              Search Input
          ========================= */}

          <InputMarker
            right="16.2px"
            icon={
              <SvgIcon
                sx={{
                  color: "text.secondary",
                  display: { xs: "none" },
                }}
              >
                <SearchIcon />
              </SvgIcon>
            }
          >
            <InputText
              placeholder="جستجو.."
              sx={{
                pr: "45px",
                borderRadius: "12px",
                color: "text.heading",
                backgroundColor: "background.surfaceSecondary",
                width: "282px",
                display: { xs: "none" },
                "::placeholder": {
                  color: "text.secondary",
                },
              }}
            />
          </InputMarker>

          {/* =========================
              User
          ========================= */}

          <NextLink href={ROUTES.PROFILE.ROOT}>
            <IconButton>
              <UserIcon sx={iconSize} />
            </IconButton>
          </NextLink>

          {/* =========================
              Notifications
          ========================= */}

          <NotificationsPopover />

          {/* =========================
              Logout
          ========================= */}

          <IconButton
            size="small"
            onClick={() => logoutMutation.mutate()}
            sx={{
              display: { xs: "none" },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* =========================
          Navigation Drawer
      ========================= */}

      <NavigationDrawer
        open={navigationDrawerOpen}
        onOpen={() => setNavigationDrawerOpen(true)}
        onClose={() => setNavigationDrawerOpen(false)}
      />
    </>
  );
}

export default PageHeader;

/* =========================================================
   Demo Switcher
========================================================= */

const demoSwitcher_sx: SxProps<Theme> = ({ palette }) => {
  return {
    display: { xs: "none" },
    backgroundColor: "background.surfaceTertiary",
    borderRadius: "999px",

    "& button": {
      padding: "0px 12px",
      borderRadius: "999px !important",
      gap: "6px",
    },

    "& .Mui-selected:last-of-type": {
      backgroundColor: `${palette.status.warning} !important`,
    },
  };
};

function DemoSwitcher() {
  const tradeMode = useTradeMode()!;
  const kycGuard = useKycGuard();

  const tradeModeHandler = () => {
    const hasAccess = kycGuard.checkAccess(KYC_LEVELS.LEVEL_1);

    if (hasAccess) {
      tradeMode.toggle();
    }
  };

  return (
    <ToggleButtonGroup
      onChange={tradeModeHandler}
      value={tradeMode.isDemo ? "demo" : "real"}
      size="medium"
      sx={demoSwitcher_sx}
    >
      <ToggleButton value="real">
        <ScanFaceIcon />
        حالت واقعی
      </ToggleButton>

      <ToggleButton value="demo">
        <FlaskIcon />
        حالت آزمایشی
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
