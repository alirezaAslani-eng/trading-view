"use client";
import BrandName from "@/components/ui/Brand/BrandName";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { alpha, Box, Stack, StackProps } from "@mui/material";
import { hideScrollBar } from "@/packages/mui/theme/shared-style";
import SwitchTheme from "../Button/SwitchTheme";
import UserProfileCard from "@/components/ui/Card/UserProfileCard";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { getSidebarNavigators } from "@/constant/app/sidebarNavigators";
import { PanelSidebarDropdown } from "@/components/template/Dropdown/PanelSidebarDropdown";
import { useQuery } from "@tanstack/react-query";
import { dashboardInfoConfig } from "@/packages/react-query";
import { useSidebarContext } from "@/context/app/Sidebar";
import SidebarToggle from "./SidebarToggle";
import { BrandIcon } from "@/components/ui/Icon";

const getSidebarWidth = (collapsed: boolean) => (collapsed ? "80px" : "264px");
function SidebarPanel(props: StackProps) {
  const { isCollapsed } = useSidebarContext()!;
  const dashboardQuery = useQuery(dashboardInfoConfig());

  return (
    <Box
      component={"aside"}
      sx={{
        position: "relative",
        width: getSidebarWidth(isCollapsed),
        height: "100%",
        overflow: "visible",
        transition: "width 0.25s ease",
        flexShrink: 0,
      }}
    >
      <SidebarToggle />

      <Stack
        {...props}
        sx={(tm) => ({
          ...hideScrollBar,
          borderRadius: "16px",
          backgroundColor: notDefinedColors["#01050F"],
          border: "1px solid",
          borderColor: alpha(notDefinedColors["#0D1324"], 0.55),
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
            borderColor: notDefinedColors["#0D1324"],
            pb: "39px",
          }}
        >
          {!isCollapsed && <BrandName />}
          <BrandIcon
            sx={{
              width: isCollapsed ? 32 : 51,
              height: isCollapsed ? 24 : 38,
            }}
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
              mb: "50px",
              mt: "32px",
              borderBottom: "1px solid",
              borderColor: "border.dark",
            }}
          >
            {getSidebarNavigators({
              permissionGroups: dashboardQuery.data?.userPermissionGroups,
            }).map((nav) => {
              return (
                <PanelSidebarDropdown
                  key={nav.id}
                  icon={nav.icon}
                  href={nav.link}
                  submenus={nav.submenus}
                  isCollapsed={isCollapsed}
                  text={nav.text}
                />
              );
            })}

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
