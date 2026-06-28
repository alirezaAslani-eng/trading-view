const TRANSACTION_TYPE = {
  TradeLock: "TradeLock",
  TradeUnLock: "TradeUnLock",
  TradeExecution: "TradeExecution",
  AdminAdjustment: "AdminAdjustment",
  Fee: "Fee",
  Deposit: "Deposit",
  Withdrawal: "Withdrawal",
  Trade: "Trade",
} as const;

type TransactionType = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TRANSACTION_TYPE.Deposit]: "واریز",
  [TRANSACTION_TYPE.Withdrawal]: "برداشت",
  [TRANSACTION_TYPE.TradeLock]: "قفل موجودی",
  [TRANSACTION_TYPE.TradeUnLock]: "آزادسازی موجودی",
  [TRANSACTION_TYPE.TradeExecution]: "اجرای معامله",
  [TRANSACTION_TYPE.AdminAdjustment]: "اصلاح توسط مدیر",
  [TRANSACTION_TYPE.Fee]: "کارمزد",
  [TRANSACTION_TYPE.Trade]: "معامله",
};

const getTransactionType = (
  type: TransactionType,
): Record<`is${TransactionType}`, boolean> => {
  return {
    isDeposit: type === TRANSACTION_TYPE.Deposit,
    isWithdrawal: type === TRANSACTION_TYPE.Withdrawal,
    isTradeLock: type === TRANSACTION_TYPE.TradeLock,
    isTradeUnLock: type === TRANSACTION_TYPE.TradeUnLock,
    isTradeExecution: type === TRANSACTION_TYPE.TradeExecution,
    isAdminAdjustment: type === TRANSACTION_TYPE.AdminAdjustment,
    isFee: type === TRANSACTION_TYPE.Fee,
    isTrade: type === TRANSACTION_TYPE.Trade,
  };
};

export { TRANSACTION_TYPE, TRANSACTION_TYPE_LABELS, getTransactionType };
export type { TransactionType };
