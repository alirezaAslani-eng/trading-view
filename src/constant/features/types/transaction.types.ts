import { KycLevel } from "@/types";

// * ----start----- siklGuides.ts -------
interface SiklGuide {
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

// * ----start----- depositWarnings.ts -------
interface DepositWarning {
  warning: string;
}
type DepositWarningList = DepositWarning[];

// * ----end----- depositWarnings.ts -------

// * ----start----- withdrawWarnings.ts -------
interface WithdrawWarning {
  warning: string;
}
type WithdrawWarningList = WithdrawWarning[];
// * ----end----- withdrawWarnings.ts -------

export type {
  SiklGuide,
  SiklGuideList,
  TransactionLimit,
  TransactionLimits,
  WithdrawWarning,
  WithdrawWarningList,
  DepositWarning,
  DepositWarningList,
};
