"use client";
import { Container, Stack } from "@mui/material";
import AuthPageBackground from "@/components/ui/background/AuthPageBackground";

function LayoutAuthPage({ children }) {
  return (
    <>
      <Stack sx={{ minHeight: "100svh", position: "relative" }}>
        <AuthPageBackground />

        <Container sx={{ flex: 1 }}>{children}</Container>
      </Stack>
    </>
  );
}

export default LayoutAuthPage;
