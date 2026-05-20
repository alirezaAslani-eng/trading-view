import { TransactionLimits } from "@/constant/features/types";

const transactionLimits = {
  Level1_Basic: {
    maxDepositPerDay: 25_000_000,
    maxDepositPerMonth: 750_000_000,
    maxWithdrawPerDay: 3_000_000,
    maxWithdrawPerMonth: 20_000_000,
  },
  Level2_Advanced: {
    maxDepositPerDay: 50_000_000,
    maxDepositPerMonth: 900_000_000,
    maxWithdrawPerDay: 10_000_000,
    maxWithdrawPerMonth: 100_000_000,
  },
} satisfies TransactionLimits;
export { transactionLimits };
