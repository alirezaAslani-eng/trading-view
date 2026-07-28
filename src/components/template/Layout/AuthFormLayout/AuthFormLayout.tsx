"use client";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { PWC } from "@/types/utils";
import { alpha, Box, Stack, StackProps } from "@mui/material";
const blur = "blur(40px)";

function AuthFormLayout({ children, sx }: PWC<Pick<StackProps, "sx">>) {
  return (
    <Box
      sx={(tm) => ({
        bgcolor: { sm: alpha(notDefinedColors["#363636"], 0.18) },
        p: "45px 30px",
        backdropFilter: { sm: blur },
        border: { sm: "2px solid" },
        borderRadius: "24px",
        borderColor: { sm: alpha(tm.palette.border.white, 0.05) },
        ...identifySxProp(tm, sx),
      })}
    >
      {children}
    </Box>
  );
}

export default AuthFormLayout;
