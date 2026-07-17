import { Box } from "@mui/material";
import SidebarPanel from "@/components/template/Sidebar/SidebarPanel";
import SupportButton from "@/components/template/Button/SupportButton";
import { HeadPhoneIcon } from "@/components/ui/Icon";
import NextImage from "@/components/ui/Image/NextImage";
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
        <Box sx={{ flex: 1, minWidth: "0px", position: "relative" }}>
          <MountainBackground />
          {children}
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              position: "sticky",
              bottom: "30px",
              pointerEvents: "none",
            }}
          >
            <SupportButton size="large" sx={{ pointerEvents: "auto" }}>
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

function MountainBackground() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "0px",
        left: "0px",
        zIndex: -1,
        backgroundColor: "background.surface",
        height: "fit-content",
        width: "fit-content",
      }}
    >
      <NextImage
        src={"/images/mountain-pattern.png"}
        alt="mountain background"
        width={950}
        height={500}
        priority
        sx={{
          mixBlendMode: "screen",
          opacity: "0.5",
        }}
      />
    </Box>
  );
}
