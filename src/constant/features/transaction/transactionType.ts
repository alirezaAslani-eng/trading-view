const TRANSACTION_TYPE = {
  TradeLock: "TradeLock",
  TradeUnlock: "TradeUnlock",
  TradeExecution: "TradeExecution",
  AdminAdjustment: "AdminAdjustment",
  Fee: "Fee",
  Deposit: "Deposit",
  Withdrawal: "Withdrawal",
} as const;

type TransactionType = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TRANSACTION_TYPE.Deposit]: "واریز",
  [TRANSACTION_TYPE.Withdrawal]: "برداشت",
  [TRANSACTION_TYPE.TradeLock]: "قفل موجودی",
  [TRANSACTION_TYPE.TradeUnlock]: "آزادسازی موجودی",
  [TRANSACTION_TYPE.TradeExecution]: "اجرای معامله",
  [TRANSACTION_TYPE.AdminAdjustment]: "اصلاح توسط مدیر",
  [TRANSACTION_TYPE.Fee]: "کارمزد",
};

const getTransactionType = (
  type: TransactionType,
): Record<`is${TransactionType}`, boolean> => {
  return {
    isDeposit: type === TRANSACTION_TYPE.Deposit,
    isWithdrawal: type === TRANSACTION_TYPE.Withdrawal,
    isTradeLock: type === TRANSACTION_TYPE.TradeLock,
    isTradeUnlock: type === TRANSACTION_TYPE.TradeUnlock,
    isTradeExecution: type === TRANSACTION_TYPE.TradeExecution,
    isAdminAdjustment: type === TRANSACTION_TYPE.AdminAdjustment,
    isFee: type === TRANSACTION_TYPE.Fee,
  };
};

export { TRANSACTION_TYPE, TRANSACTION_TYPE_LABELS, getTransactionType };
export type { TransactionType };
