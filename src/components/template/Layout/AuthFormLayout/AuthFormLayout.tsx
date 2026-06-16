"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { PWC } from "@/types/utils";
import { alpha, Stack, StackProps } from "@mui/material";
const blur = "blur(40px)";

function AuthFormLayout({ children, sx }: PWC<Pick<StackProps, "sx">>) {
  return (
    <Stack
      sx={(tm) => ({
        alignItems: "center",
        bgcolor: { sm: alpha(notDefinedColors["#363636"], 0.18) },
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
