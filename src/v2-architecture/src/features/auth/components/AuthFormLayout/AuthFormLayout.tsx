"use client";
import { alpha, Stack, StackProps } from "@mui/material";
import { PropsWithChildren } from "react";
import {
  identifySxProp,
  legacyColors,
} from "@/v2-architecture/src/design-system";

const blur = "blur(40px)";

function AuthFormLayout({
  children,
  sx,
}: PropsWithChildren<Pick<StackProps, "sx">>) {
  return (
    <Stack
      sx={(tm) => ({
        alignItems: "center",
        bgcolor: { sm: alpha(legacyColors["#363636"], 0.18) },
        p: { sm: "56px 18px 68px 18px " },
        width: "min(503px, 100%)",
        backdropFilter: { sm: blur },
        border: { sm: "2px solid" },
        borderRadius: "24px",
        borderColor: { sm: alpha(tm.palette.border.white, 0.05) },
        ...identifySxProp(tm, sx),
      })}
    >
      {children}
    </Stack>
  );
}

export default AuthFormLayout;
