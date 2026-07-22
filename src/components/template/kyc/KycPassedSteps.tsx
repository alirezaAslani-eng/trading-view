"use client";
import { KycCompletedBadge } from "@/components/ui/Badge/KycCompletedBadge";
import { DashedLine } from "@/components/ui/Icon";
import { KYC_LEVELS } from "@/constant/features/kyc/kycLevelOreder";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import { dashboardInfoConfig } from "@/packages/react-query";
import { isKycStepPassed } from "@/utils";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const queryConfig = dashboardInfoConfig();
function KycPassedSteps() {
  const query = useQuery(queryConfig);

  // TODO Ui loading fallback
  if (query.status === "pending" || query.status === "error") return "loading";

  const dashboardInfo = query.data;
  const isPassedL1 = isKycStepPassed(
    dashboardInfo.kycLevel,
    KYC_LEVELS.LEVEL_1
  );
  const isPassedL2 = isKycStepPassed(
    dashboardInfo.kycLevel,
    KYC_LEVELS.LEVEL_2
  );
  const isPassedL3 = isKycStepPassed(
    dashboardInfo.kycLevel,
    KYC_LEVELS.LEVEL_3
  );

  return (
    // TODO This Progress component must be reusable and generic not feature specific
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <KycCompletedBadge active>{"سطح پایه"}</KycCompletedBadge>

      <DashedLine sx={{ flex: 1, color: lineColor(isPassedL1) }} />
      <KycCompletedBadge active={isPassedL1}>{"سطح یک"}</KycCompletedBadge>

      <DashedLine sx={{ flex: 1, color: lineColor(isPassedL2) }} />
      <KycCompletedBadge active={isPassedL2}>{"سطح دو"}</KycCompletedBadge>

      <DashedLine sx={{ flex: 1, color: lineColor(isPassedL3) }} />
      <KycCompletedBadge active={isPassedL3}>{"سطح سه"}</KycCompletedBadge>
    </Box>
  );
}

export default KycPassedSteps;

function lineColor(isPassedLevel: boolean) {
  return isPassedLevel ? "text.primary" : notDefinedColors["#003975"];
}
