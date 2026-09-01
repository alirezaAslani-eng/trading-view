"use client";
import { alpha, Stack, styled, Typography } from "@mui/material";
import { ComponentProps, ReactElement } from "react";
import NextLink from "@/components/ui/Link/NextLink";
import { ROUTES } from "@/constant/app/routes";
import { defaultSymbol } from "@/constant/features/trading/symbol";
import {
  ArrowUpDownIcon,
  HeadPhoneIcon,
  HomeChartIcon,
  HomeIcon,
  WalletIcon,
} from "@/components/ui/Icon";

const _BottomNavigationLink = styled(NextLink)(({ theme }) => {
  const { palette, typography, breakpoints } = theme;

  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",

    "& .Mui-icon-container": {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      padding: "10px",
      borderRadius: "32px",

      "& svg": {
        width: "22px",
        height: "22px",
        color: palette.text.tertiary,
      },
      "& .Mui-icon-label": {
        ...typography.button5,
        color: palette.text.onPrimary,
        display: "none",
      },
    },

    "& .Mui-label": {
      ...typography.caption2,
      whiteSpace: "nowrap",
      textAlign: "center",
      color: palette.text.onPrimary,
      [breakpoints.up("xs-mobile")]: {
        display: "none",
      },
    },

    "&.Mui-active": {
      "& .Mui-icon-container": {
        backgroundColor: alpha(palette.background.primary!, 0.1),
        "& .Mui-icon-label": {
          [breakpoints.up("xs-mobile")]: {
            display: "block",
          },
        },
        "& svg": {
          color: palette.text.primary2,
        },
      },
    },
  };
});

const _BottomNavigation = styled(Stack)(({ theme }) => {
  const { breakpoints } = theme;

  return {
    gap: "10px",
    justifyContent: "center",
    flexDirection: "row",
    margin: "0px auto",
    width: "fit-content",
    padding: "10px 12px",
    backgroundColor: theme.palette.background.surfaceLevel4,
    borderRadius: "22px",

    [breakpoints.up("xs-mobile")]: {
      gap: "12px",
      borderRadius: "999px",
    },
  };
});

function BottomNavigationLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactElement;
  label: string;
}) {
  return (
    <_BottomNavigationLink href={href}>
      <div className="Mui-icon-container">
        {icon}
        <Typography className="Mui-icon-label">{label}</Typography>
      </div>

      <Typography className="Mui-label">{label}</Typography>
    </_BottomNavigationLink>
  );
}

export function BottomNavigation(
  props: ComponentProps<typeof _BottomNavigation>,
) {
  return (
    <_BottomNavigation {...props}>
      <BottomNavigationLink
        href={ROUTES.PANEL.ROOT}
        icon={<HomeIcon />}
        label="خانه"
      />

      <BottomNavigationLink
        href={ROUTES.MARKET.ROOT}
        icon={<HomeChartIcon />}
        label="بازار ها"
      />
      <BottomNavigationLink
        href={ROUTES.TRADE.BY_SYMBOL(defaultSymbol)}
        icon={<ArrowUpDownIcon />}
        label="معامله"
      />

      <BottomNavigationLink
        href={ROUTES.ASSETS.ROOT}
        icon={<WalletIcon />}
        label="کیف پول"
      />
      <BottomNavigationLink
        href={ROUTES.ASSETS.WITHDRAW}
        icon={<HeadPhoneIcon />}
        label="پشتیبانی"
      />
    </_BottomNavigation>
  );
}
