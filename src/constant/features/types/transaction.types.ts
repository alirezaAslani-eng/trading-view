import { KycLevel } from "@/types";

// * ----start----- siklGuides.ts -------
interface SiklGuide {
  id: string;
  guid: string;
}
type SiklGuideList = SiklGuide[];
// * ----end----- siklGuides.ts -------

// * ----start----- transactionLimits.ts -------
interface TransactionLimit {
  maxDepositPerDay: number;
  maxDepositPerMonth: number;
  maxWithdrawPerDay: number;
  maxWithdrawPerMonth: number;
}
interface TransactionLimits extends Partial<
  Record<KycLevel, TransactionLimit>
> {}
// * ----end----- transactionLimits.ts -------

export type { SiklGuide, SiklGuideList, TransactionLimit, TransactionLimits };
