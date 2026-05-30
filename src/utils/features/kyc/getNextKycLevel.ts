import KYC_LEVEL_ORDER from "@/constant/features/kyc/kycLevelOreder";
import { KycLevel } from "@/types";
import isMaximumKycLevel from "./isMaximumKycLevel";

function getNextKycLevel(currentLevel: KycLevel): {
  order: number;
  key: KycLevel;
} | null {
  if (isMaximumKycLevel(currentLevel)) return null; // * No next level
  const currentKycOrder = KYC_LEVEL_ORDER[currentLevel];

  const nextKycLevelOrder = currentKycOrder + 1;

  const nextKycLevelKey = Object.entries(KYC_LEVEL_ORDER).find(([key, _]) => {
    return KYC_LEVEL_ORDER[key as KycLevel] === nextKycLevelOrder;
  })?.[0] as KycLevel;

  return {
    key: nextKycLevelKey,
    order: nextKycLevelOrder,
  };
}

export default getNextKycLevel;
