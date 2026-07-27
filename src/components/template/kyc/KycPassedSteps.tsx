"use client";
import StepLabel, { StepLabelProps } from "@/components/ui/Steper/StepLabel";
import { KYC_STEP_STATUS, KycStepStatus } from "@/constant/features/kyc/entity";
import { KycProgressData } from "@/v2-architecture/src/features/kyc/api";
import { kycProgressConfig } from "@/v2-architecture/src/features/kyc/react-query";
import { Step, Stepper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
const queryConfig = kycProgressConfig();
function KycPassedSteps() {
  const query = useQuery(queryConfig);

  // TODO Ui loading fallback
  if (query.status === "pending" || query.status === "error") return "loading";

  const steps = resolveKycSteps(query.data);

  return (
    <Stepper>
      <Step>
        <StepLabel status="done">{"سطح پایه"}</StepLabel>
      </Step>
      {steps.map(({ lable, status }) => {
        return (
          <Step
            key={lable}
            completed={
              status === KYC_STEP_STATUS.approved ||
              status === KYC_STEP_STATUS.pending
            }
          >
            <StepLabel status={statusResolver(status)}>{lable}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}

export default KycPassedSteps;

function resolveKycSteps(
  data: KycProgressData | undefined
): { status: KycStepStatus; lable: string }[] {
  if (!data) return [];

  function resolveLevel2Status(
    address: KycStepStatus,
    document: KycStepStatus
  ): KycStepStatus {
    if (
      address === KYC_STEP_STATUS.approved &&
      document === KYC_STEP_STATUS.approved
    ) {
      return KYC_STEP_STATUS.approved;
    }

    if (
      address === KYC_STEP_STATUS.notStarted &&
      document === KYC_STEP_STATUS.notStarted
    ) {
      return KYC_STEP_STATUS.notStarted;
    }

    return KYC_STEP_STATUS.pending;
  }

  return [
    { lable: "سطح یک", status: data.level1.identity.status },
    {
      lable: "سطح دو",
      status: resolveLevel2Status(
        data.level2.address.status,
        data.level2.document.status
      ),
    },
    { lable: "سطح سه", status: data.level3.liveness.status },
  ];
}

function statusResolver(status: KycStepStatus): StepLabelProps["status"] {
  if (status === KYC_STEP_STATUS.approved) return "done";
  if (status === KYC_STEP_STATUS.notStarted) return "notStarted";
  if (status === KYC_STEP_STATUS.locked) return "notStarted";
  return "pending";
}
