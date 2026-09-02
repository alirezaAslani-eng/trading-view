import { Box, Stack } from "@mui/material";
import SidebarPanel from "@/components/template/Sidebar/SidebarPanel";
import NextImage from "@/components/ui/Image/NextImage";
import { PropsWithChildren } from "react";
import { BottomNavigation } from "./BottomNavigation";

function LayoutMainPanel({ children }: PropsWithChildren) {
  return (
    <>
      <Stack direction={"row"} sx={{ minHeight: "100svh" }}>
        {/* // * --- sidebar --- */}

        <Stack sx={{ display: { xs: "none" } }}>
          <SidebarPanel />
        </Stack>

        {/* // * Panel Content  */}
        <Box
          sx={{ flex: 1, minWidth: "0px", position: "relative", px: { xs: 4 } }}
        >
          {/* <MountainBackground /> */}

          {children}
          {/* // * Mobile Bottom Navigation */}
          <Stack sx={{ position: "sticky", bottom: "28px" }}>
            <BottomNavigation />
          </Stack>
          {/* // * Mobile Bottom Navigation */}

          {/* // * Support Button  */}
          {/* <Stack
            direction={"row"}
            sx={{
              gap: "10px",
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              position: "sticky",
              bottom: "30px",
              pointerEvents: "none",
            }}
          >
            <SupportButton size="large" sx={{ pointerEvents: "auto" }}>
              <HeadPhoneIcon color="inherit" width="22px" height="22px" />
            </SupportButton>
          </Stack> */}
        </Box>
        {/* // * Panel Content  */}
      </Stack>
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
