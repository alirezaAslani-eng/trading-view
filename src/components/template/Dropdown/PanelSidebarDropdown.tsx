"use client";
import React, { PropsWithChildren, type ReactNode } from "react";
import { Box, Stack } from "@mui/system";
import { Divider, styled, SvgIcon, Theme, Typography } from "@mui/material";
import { legacyColors } from "@/packages/mui/theme/shades";
import NextLink from "@/components/ui/Link/NextLink";
import useIsActiveLink from "@/hooks/app/useIsActiveLink";
import { KeyDownIcon, KeyUpIcon } from "@/components/ui/Icon";
import { SidebarSubMenuItem } from "@/constant/app/sidebarNavigators";
import { ROUTES } from "@/constant/app/routes";
import { useSidebarContext } from "@/context/app/Sidebar";

type NextLinkProps = React.ComponentProps<typeof NextLink>;

interface PanelSidebarDropdownProps {
  icon?: ReactNode;
  href: NextLinkProps["href"];
  submenus?: SidebarSubMenuItem[];
  isCollapsed?: boolean;
}

const sharedNavStyle = (tm: Theme) => {
  const { palette } = tm;
  return {
    transition: "background-color 350ms cubic-bezier(0.22, 1, 0.36, 1)",
    "&.Mui-active": {
      backgroundColor: palette.background.sidebarActive,
    },
    ":hover": {
      backgroundColor: palette.background.sidebarActive,
    },
  };
};

const Nav = styled(NextLink, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => {
  return {
    ...sharedNavStyle(theme),
    padding: "0px 16px",
    height: "42px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    overflowX: "hidden",
    px: "10px",

    ...(collapsed && {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px",
    }),
  };
});

const SubNav = styled(NextLink)(({ theme }) => {
  return {
    ...sharedNavStyle(theme),
    height: "36px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    padding: "0px 10px",
  };
});

function PanelSidebarDropdown({
  icon,
  href,
  submenus,
  children,
  isCollapsed,
}: PropsWithChildren<PanelSidebarDropdownProps>) {
  const exact = ([ROUTES.PANEL.ROOT] as string[]).includes(href);
  const isActiveLink = useIsActiveLink({
    href,
    exact,
  });

  const hasNested = !isCollapsed && !!submenus?.length;
  const isOpenNested = isActiveLink && hasNested;

  const LiOrUl = hasNested ? "ul" : "li";

  return (
    <LiOrUl>
      {/* // * ---start--- Parent Link ------ */}

      <Nav href={href} exact={exact} collapsed={isCollapsed}>
        {/* {isCollapsed && <SvgIcon>{icon}</SvgIcon>} */}

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <SvgIcon>{icon}</SvgIcon>
          {!isCollapsed && (
            <Typography
              variant="button3"
              className="nav-text"
              sx={{ color: "text.heading" }}
            >
              {children}
            </Typography>
          )}
        </Box>

        {!isActiveLink && hasNested && <KeyDownIcon fontSize="small" />}
        {isActiveLink && hasNested && <KeyUpIcon fontSize="small" />}
      </Nav>
      {/* // * ---end--- Parent nav ------ */}

      {/* // * ---start--- Sub navs ----------  */}
      {isOpenNested && (
        <Box component="ul" sx={{ mt: "18px", mb: "8px", display: "flex" }}>
          <Divider
            flexItem
            orientation="vertical"
            sx={{ borderColor: legacyColors["#2F3035"], mx: "15px" }}
          />

          <Stack sx={{ gap: "10px", flex: 1 }}>
            {submenus?.map((sub) => {
              return (
                <PanelSidebarNestedItem key={sub.id} href={sub.link}>
                  {sub.text}
                </PanelSidebarNestedItem>
              );
            })}
          </Stack>
        </Box>
      )}
      {/* // * ---end--- Sub navs ----------  */}
    </LiOrUl>
  );
}

function PanelSidebarNestedItem(props: NextLinkProps) {
  return (
    <Box component="li">
      <SubNav {...props}>
        <Typography variant="button3" sx={{ color: "text.heading" }}>
          {props.children}
        </Typography>
      </SubNav>
    </Box>
  );
}

export { PanelSidebarDropdown, PanelSidebarNestedItem };
