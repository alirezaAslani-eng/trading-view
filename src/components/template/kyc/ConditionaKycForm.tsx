"use client";
import { kycStatusConfig } from "@/packages/react-query";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";

const queryConfig = kycStatusConfig();

interface ConditionalFormKycProps {
  kycL1Form: ReactElement;
  kycL2Form: ReactElement;
}
function ConditionaKycForm({ kycL1Form, kycL2Form }: ConditionalFormKycProps) {
  const kycStatus = useQuery(queryConfig);
  // TODO Show an skeleton loader while the query is loading
  return (
    <>
      {kycStatus.data?.kycLevel === "None" && kycL1Form}
      {kycStatus.data?.kycLevel === "Level1_Basic" && kycL2Form}
    </>
  );
}

export default ConditionaKycForm;
