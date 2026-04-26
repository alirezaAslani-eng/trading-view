import { Box } from "@mui/material";
import React from "react";
import SidebarPanel from "@/components/template/Sidebar/SidebarPanel";

function LayoutMainPanel() {
  return (
    <>
      <Box sx={{ display: "flex", height: "2000px" }}>

        {/* // * --- sidebar --- */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              position: "sticky",
              top: "0px",
              p: "20px 20px 20px 0px",
              width: "264px",
              height: "100svh",
            }}
          >
            <SidebarPanel />
          </Box>
        </Box>

        {/* // * --- main content --- */}
        <Box sx={{ flex: 1, minWidth: "0px" }}>
          {children}
        </Box>
      </Box>
    </>
  );
}

export default LayoutMainPanel;
