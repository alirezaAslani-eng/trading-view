interface BaseApiResponse<TData> {
  isSuccess: boolean;
  message: string | null;
  errorCode: null | string;
  data: TData;
}

interface ResponseErrorType {
  readonly code?: string;
  readonly message: string;
  readonly status?: number;
  readonly statusText?: string;
  readonly details?: unknown;
}

interface ApiOptions<
  TParams extends Record<string, any> = Record<string, unknown>,
  TQueries extends Record<string, any> = Record<string, unknown>,
> {
  params?: TParams;
  queries?: TQueries;
}

type PaginationQueries = Partial<Record<"page" | "pageSize", string>>;
type PaginationResponse<TData extends any[] = []> = {
  totalCount: number;
  page: number;
  pageSize: number;
  items: TData;
};

export type {
  BaseApiResponse,
  ResponseErrorType,
  ApiOptions,
  PaginationQueries,
  PaginationResponse,
};
