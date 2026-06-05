"use client";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import { kycStatusConfig } from "@/packages/react-query";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";

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
          <BouncCircleLoader sx={{ mx: "auto" }} />
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
