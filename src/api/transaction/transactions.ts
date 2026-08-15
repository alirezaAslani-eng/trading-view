// --- transactions ---
import { TransactionsResponse } from "@/api/types";
import { TradeModeQueries } from "@/v2-architecture/src/features/trading/api";
import { QueryParams, toQueryParams } from "@/utils/app/toQueryParams";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
  PaginationQueries,
} from "@/v2-architecture/src/api";
import { TransactionType } from "@/constant/features/transaction/transactionType";
import { DateFilterQueries } from "@/types";

const url = apiClient.authBaseURL("/api/v1/wallet/transactions");

export const transactions = async ({
  signal,
  queryParams,
}: Config): Promise<TransactionsResponse> => {
  const query = new URLSearchParams(toQueryParams(queryParams)).toString();
  const res = await apiClient.get(`${url}?${query}`, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<TransactionsResponse>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type TransactionsQueryParams = QueryParams<{
  Type: TransactionType;
}> &
  PaginationQueries &
  TradeModeQueries &
  DateFilterQueries;
//#endregion // * ------------ Shared types ------------
//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ queryParams: TransactionsQueryParams }>;
//#endregion // * ------------ Internal types ------------
