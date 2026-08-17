"use client";
import Button from "@/components/ui/Button/Button";
import { ArrowLeftIcon } from "@/components/ui/Icon";
import { identifySxProp } from "@/packages/mui/theme/helpers";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { alpha, Stack, StackProps } from "@mui/material";
import {
  AUTH_FLOW_STEPS,
  useAuthFlow,
} from "@/context/feature/auth/AuthFlow/AuthFlowContext";
import { PropsWithChildren } from "react";
const blur = "blur(40px)";

function AuthFormLayout({
  children,
  sx,
}: PropsWithChildren<Pick<StackProps, "sx">>) {
  const { goBackToEnterInfo, step } = useAuthFlow()!;
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
        position: "relative",
        ...identifySxProp(tm, sx),
      })}
    >
      {step !== AUTH_FLOW_STEPS.ENTER_INFO && (
        <Button
          variant="text"
          size="small"
          sx={{ position: "absolute", color: "text", top: 16, left: 16 }}
          onClick={goBackToEnterInfo}
        >
          {"برگشت"}
          <ArrowLeftIcon fontSize="small" sx={{ color: "inherit" }} />
        </Button>
      )}
      {children}
    </Stack>
  );
}

export default AuthFormLayout;
