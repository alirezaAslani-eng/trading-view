import { ResponseErrorType } from "@/types";

const retryableStatus = [408, 409, 425, 429, 500, 502, 503, 504];

interface RetryOption {
  failCount: number;
  error: ResponseErrorType;
  retryCount?: number;
}
export const retry = ({ error, failCount, retryCount = 3 }: RetryOption) => {
  const status = error?.status;
  if (!status) return true;

  const shouldRetry = retryableStatus.includes(status);

  const maxRetry = failCount < retryCount;

  return shouldRetry && maxRetry;
};