"use client";
import { Box } from "@mui/material";
import React from "react";
import SidebarPanel from "@/shared/ui/Sidebar/SidebarPanel";
import SupportButton from "@/shared/ui/PanelLayot/SupportButton";
import { HeadPhoneIcon } from "@/shared/ui/Icon";
import { useSidebarContext } from "@/shared/context/Sidebar";

function PanelLayout({ children }) {
  const { sidebarWidth } = useSidebarContext();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "100svh",
          maxWidth: "1440px",
          mx: "auto",
        }}
      >
        {/* // * --- sidebar --- */}
        <Box sx={{ display: "flex", pr: "20px", flexDirection: "column" }}>
          <Box
            sx={{
              position: "sticky",
              top: "20px",
              width: `${sidebarWidth}px`,
              height: "calc(100svh - 40px)",
              transition: "width 0.25s ease",
              flexShrink: 0,
              overflow: "visible",
            }}
          >
            <SidebarPanel />
          </Box>
        </Box>

        {/* // * --- main content --- */}
        <Box sx={{ flex: 1, minWidth: "0px" }}>{children}</Box>
      </Box>

      <SupportButton size="large">
        {"پشتیبانی انلاین"}
        <HeadPhoneIcon color="inherit" width="22px" height="22px" />
      </SupportButton>
    </>
  );
}

export default PanelLayout;
