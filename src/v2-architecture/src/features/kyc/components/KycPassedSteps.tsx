"use client";
import { dashboardInfoConfig } from "@/v2-architecture/src/entity/user";
import { useQuery } from "@tanstack/react-query";
import { isKycStepPassed } from "../helpers";
import { Box } from "@mui/material";
import { DashedLine, SteperBadge } from "@/v2-architecture/src/shared/ui";
import { legacyColors } from "@/v2-architecture/src/design-system";

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
      <SteperBadge active>{"سطح پایه"}</SteperBadge>

      <DashedLine sx={{ flex: 1, color: lineColor(isPassedL1) }} />
      <SteperBadge active={isPassedL1}>{"سطح یک"}</SteperBadge>

      <DashedLine sx={{ flex: 1, color: lineColor(isPassedL2) }} />
      <SteperBadge active={isPassedL2}>{"سطح دو"}</SteperBadge>
    </Box>
  );
}

export default KycPassedSteps;

function lineColor(isPassedLevel: boolean) {
  return isPassedLevel ? "text.primary" : legacyColors["#003975"];
}
