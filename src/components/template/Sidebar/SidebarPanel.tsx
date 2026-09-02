"use client";
import BrandName from "@/components/ui/Brand/BrandName";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { Box, Stack, StackProps } from "@mui/material";
import { hideScrollBar } from "@/packages/mui/theme/shared-style";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { useAppNavigators } from "@/constant/app/sidebarNavigators";
import { PanelSidebarDropdown } from "@/components/template/Dropdown/PanelSidebarDropdown";
import { useSidebarContext } from "@/context/app/Sidebar";
import SidebarToggle from "./SidebarToggle";
import { BrandIcon } from "@/components/ui/Icon";
import { UserProfileCard } from "@/v2-architecture/src/features/user";

const getSidebarWidth = (collapsed: boolean) => (collapsed ? "78px" : "264px");
function SidebarPanel(props: StackProps) {
  const { isCollapsed } = useSidebarContext()!;
  const { navigators } = useAppNavigators();
  return (
    <Box
      component={"aside"}
      sx={{
        width: getSidebarWidth(isCollapsed),
        height: "100svh",
        transition: "width 0.25s ease",
        flexShrink: 0,
        position: "sticky",
        top: "0px",
      }}
    >
      <SidebarToggle />

      <Stack
        {...props}
        sx={(tm) => ({
          ...hideScrollBar,
          backgroundColor: notDefinedColors["#1B1C20"],
          maxHeight: "100%",
          height: "100%",
          overflowY: "auto",
          width: "100%",
          p: isCollapsed ? "0px 12px 18px 12px" : "0px 20px 18px 20px",
          transition: "padding 0.25s ease",

          ...identifySxProp(tm, props.sx),
        })}
      >
        {/* // * ----- brand logo ----- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderBottom: "1px solid",
            borderColor: "border.dark",
            py: "24px",
            pr: isCollapsed ? 0 : "30px",
            transition: "padding 0.25s ease",
          }}
        >
          <BrandIcon
            sx={{
              width: 51,
              height: 38,
            }}
          />

          {!isCollapsed && <BrandName />}
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
              // borderBottom: "1px solid",
              // borderColor: "border.dark",
            }}
          >
            {navigators.map((nav) => {
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
            {/* <Box
              sx={{
                mt: "calc(32px - 8px)",
                display: "flex",
                justifyContent: isCollapsed ? "center" : "stretch",
              }}
            >
              <SwitchTheme collapsed={isCollapsed} />
            </Box> */}
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
