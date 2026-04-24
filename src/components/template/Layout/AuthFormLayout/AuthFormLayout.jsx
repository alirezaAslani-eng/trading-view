"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { alpha, Stack } from "@mui/material";
const blur = "blur(40px)";
/**
 * @param {{children:import("react").ReactNode,sx:import("@mui/material").StackProps["sx"]}} param0
 * @returns
 */
function AuthFormLayout({ children, sx }) {
  return (
    <Stack
      sx={(tm) => ({
        alignItems: "center",
        bgcolor: alpha(notDefinedColors["#363636"], 0.18),
        p: "56px 18px 68px 18px ",
        width: "min(503px, 100%)",
        backdropFilter: blur,
        border: "2px solid",
        borderRadius: "24px",
        borderColor: alpha(tm.palette.border.white,0.05),
        ...identifySxProp(tm, sx),
      })}
    >
      {children}
    </Stack>
  );
}

export default AuthFormLayout;
