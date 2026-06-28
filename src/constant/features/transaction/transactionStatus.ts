const TRANSACTION_STATUS = {
  Success: "Success",
  Pending: "Pending",
  Failed: "Failed",
} as const;

type TransactionStatus =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

export { TRANSACTION_STATUS };
export type { TransactionStatus };
