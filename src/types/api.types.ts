interface BaseApiResponse {
  isSuccess: boolean;
  message: string | null;
  errorCode: null | string;
}

export type { BaseApiResponse };
