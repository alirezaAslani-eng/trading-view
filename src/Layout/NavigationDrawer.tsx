"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  NAV_CATEGORY,
  NAV_CATEGORY_LABEL,
  useAppNavigators,
} from "@/constant/app/sidebarNavigators";

import {
  SwipeableDrawer,
  SwipeableDrawerLayout,
  WrappedSwipeableDrawerProps,
} from "@/v2-architecture/src/shared/ui";
import { ReactNode } from "react";
import NextLink from "@/components/ui/Link/NextLink";
import { Stack } from "@mui/system";

function NavigationDrawer({
  open,
  onClose,
  onOpen,
}: WrappedSwipeableDrawerProps) {
  const { navigators } = useAppNavigators();

  const categories = [
    NAV_CATEGORY.QUICK_ACCESS,
    NAV_CATEGORY.WALLET,
    NAV_CATEGORY.OTHERS,
    NAV_CATEGORY.ADMIN,
  ];

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
    >
      <SwipeableDrawerLayout onClose={onClose}>
        <Stack spacing={9}>
          {categories.map((category) => {
            const categoryNavigators = navigators.filter(
              (nav) => nav.category === category,
            );

            if (!categoryNavigators.length) return null;

            return (
              <Stack key={category} spacing={3}>
                <Typography variant="body3" sx={{ color: "text.heading" }}>
                  {NAV_CATEGORY_LABEL[category]}
                </Typography>

                <Grid container spacing={3}>
                  {categoryNavigators.map((nav) => (
                    <Grid key={nav.id} size={{ xs: 6, "xs-mobile": 4 }}>
                      <NavigationItem
                        onClick={onClose}
                        href={nav.link}
                        text={nav.text}
                        icon={nav.icon}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            );
          })}
        </Stack>
      </SwipeableDrawerLayout>
    </SwipeableDrawer>
  );
}

interface NavigationItemProps {
  text: string;
  icon: ReactNode;
  href: string;
  onClick?: () => void;
}

function NavigationItem({ text, icon, href, onClick }: NavigationItemProps) {
  return (
    <NextLink
      href={href}
      onClick={onClick}
      sx={{
        height: "72px",
        display: "flex",
        p: "14px",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        gap: 2.5,
        borderRadius: "18px",
        bgcolor: "background.surfaceLevel4",
      }}
    >
      {icon}

      <Typography
        variant="caption"
        sx={{
          textAlign: "center",
          lineHeight: 1.5,
          color: "text.onPrimary",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Typography>
    </NextLink>
  );
}

export { NavigationItem };

export { NavigationDrawer };
