"use client";

import { Box, IconButton, SvgIcon } from "@mui/material";
import { legacyColors } from "@/packages/mui/theme/shades";
import { useSidebarContext } from "@/context/app/Sidebar";

function SidebarChevronIcon(props) {
  return (
    <SvgIcon viewBox="0 0 10 12" fill="none" {...props}>
      <path
        d="M7.25 1.5L3.25 6L7.25 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function SidebarToggle() {
  const { isCollapsed, toggleSidebar } = useSidebarContext();

  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: "72px",
        transform: "translateX(-50%)",
        zIndex: 2,
      }}
    >
      <IconButton
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "باز کردن منو" : "بستن منو"}
        sx={{
          width: "24px",
          height: "28px",
          borderRadius: "6px 0 0 6px",
          backgroundColor: legacyColors["#1B1C20"],
          border: "1px solid",
          borderColor: "border.dark",
          borderRight: "none",
          color: "text.heading",
          overflow: "visible",
          p: "0 2px 0 4px",
          "&:hover": {
            backgroundColor: "background.toggleActive",
          },
        }}
      >
        <SidebarChevronIcon
          sx={{
            width: "10px",
            height: "12px",
            overflow: "visible",
            transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </IconButton>
    </Box>
  );
}

export default SidebarToggle;
