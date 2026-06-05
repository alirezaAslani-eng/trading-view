"use client";
import { KycCompletedBadge } from "@/components/ui/Badge/KycCompletedBadge";
import { DashedLine } from "@/components/ui/Icon";
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
  const isPassedL1 = isKycStepPassed(dashboardInfo.kycLevel, "Level1_Basic");
  const isPassedL2 = isKycStepPassed(dashboardInfo.kycLevel, "Level2_Advanced");

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
