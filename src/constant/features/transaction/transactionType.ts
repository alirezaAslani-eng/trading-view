const TRANSACTION_TYPE = {
  TradeLock: "TradeLock",
  Deposit: "Deposit",
  Withdrawal: "Withdrawal",
  Trade: "Trade",
} as const;

const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TRANSACTION_TYPE.Deposit]: "واریز",
  [TRANSACTION_TYPE.Withdrawal]: "برداشت",
  [TRANSACTION_TYPE.TradeLock]: "قفل موجودی",
  [TRANSACTION_TYPE.Trade]: "معامله",
};

type TransactionType = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

const getTransactionType = (
  type: TransactionType,
): Record<`is${TransactionType}`, boolean> => {
  return {
    isDeposit: type === TRANSACTION_TYPE.Deposit,
    isTradeLock: type === TRANSACTION_TYPE.TradeLock,
    isTrade: type === TRANSACTION_TYPE.Trade,
    isWithdrawal: type === TRANSACTION_TYPE.Withdrawal,
  };
};

export { TRANSACTION_TYPE, TRANSACTION_TYPE_LABELS, getTransactionType };
export type { TransactionType };
