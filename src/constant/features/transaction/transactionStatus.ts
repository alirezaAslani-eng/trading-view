const TRANSACTION_STATUS = {
  Success: "Success",
  Pending: "Pending",
  Failed: "Failed",
} as const;

type TransactionStatus =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

const TRANSACTION_STATUS_LABELS: Record<TransactionStatus, string> = {
  [TRANSACTION_STATUS.Pending]: "در انتظار",
  [TRANSACTION_STATUS.Success]: "موفق",
  [TRANSACTION_STATUS.Failed]: "ناموفق",
};

export { TRANSACTION_STATUS, TRANSACTION_STATUS_LABELS };
export type { TransactionStatus };
