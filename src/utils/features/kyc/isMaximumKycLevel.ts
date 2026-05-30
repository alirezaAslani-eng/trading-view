import KYC_LEVEL_ORDER from "@/constant/features/kyc/kycLevelOreder";
import { KycLevel } from "@/types";

function isMaximumKycLevel(kycLevel: KycLevel): boolean {
  const kycOrders = Object.values(KYC_LEVEL_ORDER).sort((a, b) => a - b);
  if (kycOrders.length - 1 > KYC_LEVEL_ORDER[kycLevel]) return false;
  return true;
}

export default isMaximumKycLevel;
