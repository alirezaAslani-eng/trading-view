"use client";

import { PropsWithChildren } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { CloseIcon } from "@/components/ui/Icon";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import { Stack } from "@mui/system";

interface SwipeableDrawerLayoutProps extends PropsWithChildren {
  title?: string;
  onClose: () => void;
}

const _SwipeableDrawerLayout = styled(PanelPaper)(({ theme }) => ({
  width: "100%",
  borderRadius: "30px 30px 0 0",
  padding: "0px 16px 32px 16px",
}));

const _Content = styled(Box)({
  maxHeight: "calc(80dvh - 64px)",
  overflowY: "auto",
  overscrollBehavior: "contain",
});

function SwipeableDrawerLayout({
  title,
  onClose,
  children,
}: SwipeableDrawerLayoutProps) {
  return (
    <_SwipeableDrawerLayout>
      {/* * Drag Handle */}
      <Stack
        sx={{
          height: "22px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "4px",
            width: "40px",
            borderRadius: "10px",
            bgcolor: "text.linkDisable",
          }}
        />
      </Stack>

      {/* * Header */}
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography variant="body3" sx={{ color: "text.heading" }}>
          {title}
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      {/* * Content */}
      <_Content>{children}</_Content>
    </_SwipeableDrawerLayout>
  );
}

export { SwipeableDrawerLayout };
