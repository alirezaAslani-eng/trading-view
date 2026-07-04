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
type TransactionKeyType = keyof typeof TRANSACTION_TYPE;

const TRANSACTION_TYPE_LABELS: Record<TransactionKeyType, string> = {
  Deposit: "واریز",
  Withdrawal: "برداشت",
  TradeLock: "قفل موجودی",
  TradeUnlock: "آزادسازی موجودی",
  TradeExecution: "اجرای معامله",
  AdminAdjustment: "اصلاح توسط مدیر",
  Fee: "کارمزد",
} as const;

const TRANSACTION_TYPE_LIST: {
  value: TransactionType;
  label: string;
}[] = (Object.keys(TRANSACTION_TYPE_LABELS) as TransactionKeyType[]).map(
  (key) => {
    return {
      value: TRANSACTION_TYPE[key],
      label: TRANSACTION_TYPE_LABELS[key],
    };
  },
);

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

export {
  TRANSACTION_TYPE,
  TRANSACTION_TYPE_LABELS,
  TRANSACTION_TYPE_LIST,
  getTransactionType,
};
export type { TransactionType };
