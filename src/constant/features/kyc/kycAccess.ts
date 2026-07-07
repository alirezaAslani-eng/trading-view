import { KYC_LEVELS } from "@/constant/features/kyc/kycLevelOreder";

const KYC_REQUIRED_LEVELS = {
  trade: KYC_LEVELS.LEVEL_2,
  withdraw: KYC_LEVELS.LEVEL_1,
} as const;

export default KYC_REQUIRED_LEVELS;