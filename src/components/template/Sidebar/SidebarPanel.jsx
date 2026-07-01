"use client";
import BrandName from "@/components/ui/Brand/BrandName";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { Badge, Box, Stack, SvgIcon, Typography } from "@mui/material";
import React from "react";
import { hideScrollBar } from "@/packages/mui/theme/shared-style";
import SwitchTheme from "../Button/SwitchTheme";
import UserProfileCard from "@/components/ui/Card/UserProfileCard";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import sidebarNavigators from "@/constant/app/sidebarNavigators";
import {
  PanelSidebarDropdown,
  PanelSidebarNestedItem,
} from "@/components/template/Dropdown/PanelSidebarDropdown";
import { ActiveItemProvider } from "@/context/app/ActiveItem";
import { useSidebarContext } from "@/context/app/Sidebar";
import NextImage from "@/components/ui/Image/NextImage";
import SidebarToggle from "./SidebarToggle";

const badge_sx = {
  right: "initial",
  top: "21px",
  left: "2px",
};

/**
 * @param {import("@mui/material").BoxProps} props
 */

function SidebarPanel(props) {
  const { isCollapsed } = useSidebarContext();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      <SidebarToggle />

      <Stack
        component={"aside"}
        {...props}
        sx={(tm) => ({
          ...hideScrollBar,
          borderRadius: "16px",
          backgroundColor: notDefinedColors["#1B1C20"],
          maxHeight: "100%",
          height: "100%",
          overflowY: "auto",
          width: "100%",
          p: isCollapsed ? "39px 12px 18px 12px" : "39px 20px 18px 20px",
          transition: "padding 0.25s ease",

          ...identifySxProp(tm, props.sx),
        })}
      >
        {/* // * ----- brand logo ----- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: isCollapsed ? 0 : "12px",
            borderBottom: "1px solid",
            borderColor: "border.dark",
            pb: "39px",
          }}
        >
          {!isCollapsed && <BrandName />}
          <NextImage
            src={"/images/brand-logo.png"}
            alt="brand logo"
            width={isCollapsed ? 32 : 51}
            height={isCollapsed ? 24 : 38}
            sx={{ objectFit: "cover" }}
          />
        </Box>
        <Stack
          sx={{ justifyContent: "space-between", flex: 1, minHeight: "0px" }}
        >
          {/* // * -------- Menu list -------- */}
          <Stack
            sx={{
              gap: "8px",
              pb: "20px",
              mt: "32px",
              borderBottom: "1px solid",
              borderColor: "border.dark",
            }}
          >
            <ActiveItemProvider>
              {sidebarNavigators.map((nav) => {
                return (
                  <Badge
                    key={nav.id}
                    color="error"
                    sx={{ display: "block", width: "100%" }}
                    slotProps={{ badge: { sx: badge_sx } }}
                  >
                    <PanelSidebarDropdown
                      icon={<SvgIcon>{nav.icon}</SvgIcon>}
                      text={nav.text}
                      href={nav.link}
                      id={nav.id}
                      collapsed={isCollapsed}
                    >
                      {!!nav.submenus.length &&
                        nav.submenus.map((subNav) => {
                          return (
                            <PanelSidebarNestedItem
                              key={subNav.id}
                              href={subNav.link}
                            >
                              <Typography
                                variant="button3"
                                sx={{ color: "text.heading" }}
                              >
                                {subNav.text}
                              </Typography>
                            </PanelSidebarNestedItem>
                          );
                        })}
                    </PanelSidebarDropdown>
                  </Badge>
                );
              })}
            </ActiveItemProvider>

            {/* // * -------- Dark/Light Button -------- */}
            <Box
              sx={{
                mt: "calc(32px - 8px)",
                display: "flex",
                justifyContent: isCollapsed ? "center" : "stretch",
              }}
            >
              <SwitchTheme collapsed={isCollapsed} />
            </Box>
          </Stack>

          {/* // * ----- user profile ------ */}
          <Box
            sx={{
              mt: "20px",
              display: "flex",
              justifyContent: isCollapsed ? "center" : "stretch",
              position: "sticky",
              bottom: "2px",
            }}
          >
            <UserProfileCard collapsed={isCollapsed} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default SidebarPanel;
