import KYC_LEVEL_ORDER from "@/constant/features/kyc/kycLevelOreder";
import { KycLevel } from "@/types";

function isKycStepPassed(
  currentLevel: KycLevel | undefined,
  requiredLevel: KycLevel,
): boolean {
  if (!currentLevel) return false;
  return KYC_LEVEL_ORDER[currentLevel] >= KYC_LEVEL_ORDER[requiredLevel];
}

export default isKycStepPassed;
