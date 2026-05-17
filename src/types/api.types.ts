interface BaseApiResponse {
  isSuccess: boolean;
  message: string | null;
  errorCode: null | string;
}

interface ResponseErrorType {
  readonly code?: string;
  readonly message: string;
  readonly status?: number;
  readonly statusText?: string;
  readonly details?: unknown;
}
export type { BaseApiResponse, ResponseErrorType };
