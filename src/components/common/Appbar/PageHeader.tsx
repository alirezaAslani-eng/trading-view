"use client";
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

interface PageHeaderProps extends Pick<BoxProps, "sx"> {
  title: string;
  subtitle: string;
}

function PageHeader({ sx, title, subtitle }: PageHeaderProps) {
  const router = useRouter();
  const logoutMutation = useMutation(
    logoutConfig({
      onSuccess: () => router.replace(ROUTES.AUTH.ROOT),
    }),
  );

  return (
    <Box
      sx={(tm) => ({
        display: "flex",
        justifyContent: "space-between",
        ...identifySxProp(tm, sx),
      })}
    >
      <Box component={"aside"}>
        <Typography
          variant="h2"
          sx={{ color: "text.heading", display: { xs: "none" } }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.heading", mt: "4px", display: { xs: "none" } }}
        >
          {subtitle}
        </Typography>
        <IconButton>
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>

      <Stack
        direction={"row"}
        component={"aside"}
        sx={{
          alignItems: "center",
          gap: { xs: "12px" }, // * Desktop : "18px"
        }}
      >
        {/* // * Demo switcher button */}
        <DemoSwitcher />
        {/* // * Demo switcher button */}

        <InputMarker
          right={"16.2px"}
          icon={
            <SvgIcon
              sx={{
                colo: "text.secondary",
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

        {/* // * ------- User -------- */}
        <NextLink href={ROUTES.PROFILE.ROOT}>
          <IconButton>
            <UserIcon />
          </IconButton>
        </NextLink>
        {/* // * ------- User -------- */}

        {/* // * ------- Notifications -------- */}
        <NotificationsPopover />
        {/* // * ------- Notifications -------- */}

        {/* // * ------- Logout -------- */}
        <IconButton
          size="small"
          onClick={() => logoutMutation.mutate()}
          sx={{ display: { xs: "none" } }}
        >
          <LogoutIcon />
        </IconButton>
        {/* // * ------- Logout -------- */}
      </Stack>
    </Box>
  );
}

export default PageHeader;

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
    if (hasAccess) tradeMode.toggle();
  };

  return (
    <>
      <ToggleButtonGroup
        onChange={tradeModeHandler}
        value={tradeMode.isDemo ? "demo" : "real"}
        size="medium"
        sx={demoSwitcher_sx}
      >
        <ToggleButton value={"real"}>
          <ScanFaceIcon />
          {"حالت واقعی"}
        </ToggleButton>
        <ToggleButton value={"demo"}>
          <FlaskIcon />
          {"حالت آزمایشی"}
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
