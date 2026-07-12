import { Box } from "@mui/material";
import SidebarPanel from "@/components/template/Sidebar/SidebarPanel";
import SupportButton from "@/components/template/Button/SupportButton";
import { HeadPhoneIcon } from "@/components/ui/Icon";

function LayoutMainPanel({ children }) {

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
              height: "calc(100svh - 40px)",
            }}
          >
            <SidebarPanel />
          </Box>
        </Box>

        {/* // * --- main content --- */}
        <Box sx={{ flex: 1, minWidth: "0px" }}>
          {children}
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              position: "sticky",
              bottom: "30px",
            }}
          >
            <SupportButton size="large">
              {"پشتیبانی انلاین"}
              <HeadPhoneIcon color="inherit" width="22px" height="22px" />
            </SupportButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LayoutMainPanel;
