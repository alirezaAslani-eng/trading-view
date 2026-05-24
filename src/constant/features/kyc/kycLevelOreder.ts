import { KycLevel } from "@/types";

const KYC_LEVEL_ORDER: Record<KycLevel, number> = {
  None: 0,
  Level1_Basic: 1,
  Level2_Advanced: 2,
  Level3_Business: 3,
} as const;

export default KYC_LEVEL_ORDER;
