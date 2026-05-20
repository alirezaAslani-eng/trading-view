const transactionLimits = {
  kycL1: {
    maxDepositPerDay: 25_000_000,
    maxDepositPerMonth: 750_000_000,
    maxWithdrawPerDay: 3_000_000,
    maxWithdrawPerMonth: 20_000_000,
  },
  kycL2: {
    maxDepositPerDay: 50_000_000,
    maxDepositPerMonth: 900_000_000,
    maxWithdrawPerDay: 10_000_000,
    maxWithdrawPerMonth: 100_000_000,
  },
};
export { transactionLimits };
