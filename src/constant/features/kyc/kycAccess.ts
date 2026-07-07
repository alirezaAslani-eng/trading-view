import { KYC_LEVELS } from "@/constant/features/kyc/kycLevelOreder";

const KYC_REQUIRED_LEVELS = {
  deposit: KYC_LEVELS.LEVEL_1,
  trade: KYC_LEVELS.LEVEL_1,
  withdraw: KYC_LEVELS.LEVEL_1,
} as const;

export default KYC_REQUIRED_LEVELS;
