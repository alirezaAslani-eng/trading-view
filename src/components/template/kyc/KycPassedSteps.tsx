import { dashboardInfo } from "@/api";
import { KycCompletedBadge } from "@/components/ui/Badge/KycCompletedBadge";
import { DashedLine } from "@/components/ui/Icon";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { isKycStepPassed } from "@/utils";
import { Box } from "@mui/material";
import { cookies } from "next/headers";

async function KycPassedSteps() {
  const cookieStore = await cookies();

  const dashboard_info = await dashboardInfo({
    headers: { cookie: cookieStore.toString() },
  })!;

  const isPassedL1 = isKycStepPassed(dashboard_info.kycLevel, "Level1_Basic");
  const isPassedL2 = isKycStepPassed(
    dashboard_info.kycLevel,
    "Level2_Advanced",
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <KycCompletedBadge active>{"سطح پایه"}</KycCompletedBadge>

      <DashedLine sx={{ flex: 1, color: lineColor(isPassedL1) }} />
      <KycCompletedBadge active={isPassedL1}>{"سطح یک"}</KycCompletedBadge>

      <DashedLine sx={{ flex: 1, color: lineColor(isPassedL2) }} />
      <KycCompletedBadge active={isPassedL2}>{"سطح دو"}</KycCompletedBadge>
    </Box>
  );
}

export default KycPassedSteps;

function lineColor(isPassedLevel: boolean) {
  return isPassedLevel ? "text.primary" : notDefinedColors["#003975"];
}
