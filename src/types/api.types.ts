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

interface LegacyApiOptions<
  TParams extends Record<string, any> = Record<string, unknown>,
  TQueries extends Record<string, any> = Record<string, unknown>,
> {
  params?: TParams;
  queries?: TQueries;
}

//#region // * ------------ General API Options ------------
interface ApiExtraOptions {
  queries?: string;
  params?: Record<string, any>;
}

type ApiOptions<TExtra extends ApiExtraOptions = {}> = Pick<
  RequestInit,
  "signal"
> &
  TExtra;
//#endregion // * ------------ General API Options ------------

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
  LegacyApiOptions,
  ApiOptions,
  PaginationQueries,
  PaginationResponse,
};
