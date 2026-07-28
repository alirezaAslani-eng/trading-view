"use client";
import { Container, Stack } from "@mui/material";
import AuthPageBackground from "@/components/ui/background/AuthPageBackground";
import { PropsWithChildren } from "react";

function LayoutAuthPage({ children }: PropsWithChildren) {
  return (
    <>
      <Stack sx={{ minHeight: "100svh", position: "relative" }}>
        <AuthPageBackground />

        {children}
      </Stack>
    </>
  );
}

export default LayoutAuthPage;
