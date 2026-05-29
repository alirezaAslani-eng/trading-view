import KYC_LEVEL_ORDER from "@/constant/features/kyc/kycLevelOreder";
import { KycLevel } from "@/types";

function getNextKycLevel(currentLevel: KycLevel): {
  order: number;
  key: KycLevel;
} | null {
  const kycOrders = Object.values(KYC_LEVEL_ORDER).sort((a, b) => a - b);

  const maxiumOrder = kycOrders[kycOrders.length - 1];

  const currentKycOrder = KYC_LEVEL_ORDER[currentLevel];

  if (typeof currentKycOrder !== "number" || currentKycOrder >= maxiumOrder) {
    return null; // * No next level
  }

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
