"use client";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import { KYC_LEVELS } from "@/constant/features/kyc/kycLevelOreder";
import { kycStatusConfig } from "@/packages/react-query";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";

const queryConfig = kycStatusConfig();

interface ConditionalFormKycProps {
  kycL1Form: ReactElement;
  kycL2Form: ReactElement;
  kycL3Form: ReactElement;
}
function ConditionaKycForm({
  kycL1Form,
  kycL2Form,
  kycL3Form,
}: ConditionalFormKycProps) {
  const kycStatus = useQuery(queryConfig);
  const isSuccessQuey = kycStatus.status === "success";
  return (
    <>
      {!isSuccessQuey ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: "80px" }}>
          <BouncCircleLoader sx={{ mx: "auto" }} />
        </Box>
      ) : (
        <>
          {kycStatus.data.kycLevel === KYC_LEVELS.LEVEL_1 && kycL1Form}
          {kycStatus.data.kycLevel === KYC_LEVELS.LEVEL_2 && kycL2Form}
          {kycStatus.data.kycLevel === KYC_LEVELS.LEVEL_3 && kycL3Form}
        </>
      )}
    </>
  );
}

export default ConditionaKycForm;
