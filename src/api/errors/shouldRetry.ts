import { ResponseErrorType } from "@/types";
import { retryableStatus } from "./config";

interface RetryOption {
  failCount: number;
  error: ResponseErrorType;
  retryCount?: number;
}

export const shouldRetry = ({
  error,
  failCount,
  retryCount = 3,
}: RetryOption) => {
  const status = error?.status;
  if (!status) return true;

  const shouldRetry = retryableStatus.includes(status);

  const maxRetry = failCount < retryCount;

  return shouldRetry && maxRetry;
};
