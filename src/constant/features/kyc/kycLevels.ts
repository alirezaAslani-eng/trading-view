import { KycLevel } from "@/types";

const kYC_LEVELS: Record<KycLevel, string> = {
  None: "نیاز به احراز حویت",
  Level1_Basic: "سطح یک",
  Level2_Advanced: "سطح دو",
  Level3_Business: "سطح سه",
} as const;

export default kYC_LEVELS;
