"use client";
import { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { BounceCircleLoader } from "@/v2-architecture/src/shared/ui";
import { kycStatusConfig } from "@/v2-architecture/src/entity/kyc";

const queryConfig = kycStatusConfig();

interface ConditionalFormKycProps {
  kycL1Form: ReactElement;
  kycL2Form: ReactElement;
}
function ConditionaKycForm({ kycL1Form, kycL2Form }: ConditionalFormKycProps) {
  const kycStatus = useQuery(queryConfig);
  const isSuccessQuey = kycStatus.status === "success";
  return (
    <>
      {!isSuccessQuey ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: "80px" }}>
          <BounceCircleLoader sx={{ mx: "auto" }} />
        </Box>
      ) : (
        <>
          {kycStatus.data.kycLevel === "None" && kycL1Form}
          {kycStatus.data.kycLevel === "Level1_Basic" && kycL2Form}
        </>
      )}
    </>
  );
}

export default ConditionaKycForm;
