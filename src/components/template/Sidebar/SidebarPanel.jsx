"use client";
import BrandName from "@/components/ui/Brand/BrandName";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { Badge, Box, Stack, SvgIcon, Typography } from "@mui/material";
import React from "react";
import { hideScrollBar } from "@/packages/mui/theme/shared-style";
import SwitchTheme from "../Button/SwitchTheme";
import UserProfileCard from "@/components/ui/Card/UserProfileCard";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import BrandIcon from "@/assets/svg/brand-icon.svg";
import sidebarNavigators from "@/constant/app/sidebarNavigators";
import {
  PanelSidebarDropdown,
  PanelSidebarNestedItem,
} from "@/components/template/Dropdown/PanelSidebarDropdown";

const badge_sx = {
  right: "initial",
  top: "21px",
  left: "2px",
};

/**
 * @param {import("@mui/material").BoxProps} props
 */

function SidebarPanel(props) {
  return (
    <Box
      component={"aside"}
      {...props}
      sx={(tm) => ({
        ...hideScrollBar,
        borderRadius: "16px",
        backgroundColor: notDefinedColors["#1B1C20"],
        maxHeight: "100%",
        overflowY: "auto",
        width: "100%",
        p: "39px 20px 18px 20px",

        ...identifySxProp(tm, props.sx),
      })}
    >
      {/* // * ----- brand logo ----- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          borderBottom: "1px solid",
          borderColor: "border.dark",
          pb: "39px",
        }}
      >
        <BrandName />
        <SvgIcon sx={{ width: "51px", height: "38px" }}>
          <BrandIcon />
        </SvgIcon>
      </Box>

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
        {sidebarNavigators.map((nav) => {
          return (
            <Badge color="error" slotProps={{ badge: { sx: badge_sx } }}>
              <PanelSidebarDropdown
                icon={<SvgIcon>{nav.icon}</SvgIcon>}
                text={nav.text}
                href={nav.link}
              >
                {!!nav.submenus.length &&
                  nav.submenus.map((subNav) => {
                    return (
                      <PanelSidebarNestedItem href={subNav.link}>
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
      </Stack>

      {/* // * -------- Dark/Light Button -------- */}
      <Box sx={{ mt: "32px" }}>
        <SwitchTheme />
      </Box>
      {/* // * ----- user profile ------ */}
      <Box sx={{ mt: "144px" }}>
        <UserProfileCard />
      </Box>
    </Box>
  );
}

export default SidebarPanel;
