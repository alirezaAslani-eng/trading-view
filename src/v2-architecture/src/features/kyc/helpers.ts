import { kYC_LEVEL_LABELS, KYC_LEVEL_ORDER } from "./constants";
import { KycLevel } from "@/v2-architecture/src/entity/kyc";
export function isKycStepPassed(
  currentLevel: KycLevel | undefined,
  requiredLevel: KycLevel,
): boolean {
  if (!currentLevel) return false;
  return KYC_LEVEL_ORDER[currentLevel] >= KYC_LEVEL_ORDER[requiredLevel];
}

export function isMaximumKycLevel(kycLevel: KycLevel): boolean {
  const kycOrders = Object.values(KYC_LEVEL_ORDER).sort((a, b) => a - b);
  if (kycLevel === "Level2_Advanced") return true; // ! This code will be removed later
  if (kycOrders.length - 1 > KYC_LEVEL_ORDER[kycLevel]) return false;
  return true;
}

export function getNextKycLevel(currentLevel: KycLevel): {
  order: number;
  key: KycLevel;
  label: string;
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
    label: kYC_LEVEL_LABELS[nextKycLevelKey],
  };
}
