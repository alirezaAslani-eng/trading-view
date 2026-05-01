"use client";
import { alpha, Box, Button, Portal } from "@mui/material";
import React from "react";
import SidebarPanel from "@/components/template/Sidebar/SidebarPanel";
import SupportButton from "@/components/template/Button/SupportButton";

function LayoutMainPanel({ children }) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* // * --- sidebar --- */}
        <Box sx={{ display: "flex", pr: "20px", flexDirection: "column" }}>
          <Box
            sx={{
              position: "sticky",
              top: "20px",
              width: "264px",
              height: "calc(100svh - 40px)",
            }}
          >
            <SidebarPanel />
          </Box>
        </Box>

        {/* // * --- main content --- */}
        <Box sx={{ flex: 1, minWidth: "0px", pb: "48px" }}>{children}</Box>
      </Box>

      <SupportButton size="large">{"پشتیبانی انلاین"}</SupportButton>
    </>
  );
}

export default LayoutMainPanel;
