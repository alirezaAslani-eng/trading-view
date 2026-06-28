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

const getTransactionStatus = (
  status: TransactionStatus,
): Record<`is${TransactionStatus}`, boolean> => {
  return {
    isPending: status === TRANSACTION_STATUS.Pending,
    isFailed: status === TRANSACTION_STATUS.Failed,
    isSuccess: status === TRANSACTION_STATUS.Success,
  };
};

export { TRANSACTION_STATUS, TRANSACTION_STATUS_LABELS, getTransactionStatus };
export type { TransactionStatus };
