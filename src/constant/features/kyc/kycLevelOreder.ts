import { KycLevel } from "@/types";

const KYC_LEVEL_ORDER: Record<KycLevel, number> = {
  None: 0,
  Level1_Basic: 1,
  Level2_Advanced: 2,
  Level3_Business: 3,
} as const;
  export const KYC_LEVELS = {
  None: "None",
  LEVEL_1: "Level1_Basic",
  LEVEL_2: "Level2_Advanced",
  LEVEL_3: "Level3_Business",
} satisfies Record<string, KycLevel>;

export default KYC_LEVEL_ORDER;
