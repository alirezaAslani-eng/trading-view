import { KYC_STEP_STATUS } from "@/constant/features/kyc/entity";
import { KycProgressData } from "../api";
import isMaximumKycLevel from "@/utils/features/kyc/isMaximumKycLevel";

interface GetKycStepStatusReturn {
  reachedMax: boolean;
  hasPendingStep: boolean;
}

export function getKycStepStatus(kycProgress: undefined): null;

export function getKycStepStatus(
  kycProgress: KycProgressData
): GetKycStepStatusReturn;

export function getKycStepStatus(
  kycProgress: KycProgressData | undefined
): GetKycStepStatusReturn | null;

export function getKycStepStatus(
  kycProgress: KycProgressData | undefined
): null | GetKycStepStatusReturn {
  if (!kycProgress) return null;

  const steps = [
    kycProgress.level1.identity,
    kycProgress.level2.address,
    kycProgress.level2.document,
    kycProgress.level3.liveness,
  ];

  const hasPendingStep = steps.some(
    (step) => step.status === KYC_STEP_STATUS.pending
  );

  const reachedMax = isMaximumKycLevel(kycProgress.currentLevel);

  return {
    reachedMax,
    hasPendingStep,
  };
}
