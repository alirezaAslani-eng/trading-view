const TRANSACTION_TYPE = {
  TradeLock: "TradeLock",
  Deposit: "Deposit",
  Withdrawal: "Withdrawal",
  Trade: "Trade",
} as const;

type TransactionType = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export { TRANSACTION_TYPE };
export type { TransactionType };
