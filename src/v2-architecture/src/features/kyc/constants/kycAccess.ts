import { KYC_LEVELS } from "./entity";

export const KYC_REQUIRED_LEVELS = {
  trade: KYC_LEVELS.LEVEL_1,
  withdraw: KYC_LEVELS.LEVEL_1,
  deposit: KYC_LEVELS.LEVEL_1,
  bankAccount: KYC_LEVELS.LEVEL_2,
} as const;
