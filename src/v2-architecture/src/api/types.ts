import { QueryParamRules } from "@/utils/app/toQueryParams";

export interface BaseApiResponse<TData> {
  isSuccess: boolean;
  message: string | null;
  errorCode: null | string;
  data: TData;
}

export type PaginationQueries = Partial<Record<"page" | "pageSize", string>>;
export type PaginationResponse<TData extends any[] = []> = {
  totalCount: number;
  page: number;
  pageSize: number;
  items: TData;
};

//#region // * ------------ Api Configuration ------------
interface ApiConfigRule {
  queries?: string;
  queryParams?: QueryParamRules;
  params?: Record<string, any>;
  body?: any;
}

export type ApiConfig<
  TConfig extends ApiConfigRule = {},
  TExtra extends object = {},
> = Pick<RequestInit, "signal"> & TConfig & TExtra;
//#endregion // * ------------ Api Configuration ------------
