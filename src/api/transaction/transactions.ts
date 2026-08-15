// --- transactions ---
import { TransactionsResponse } from "@/api/types";
import { TradeModeQueries } from "@/v2-architecture/src/features/trading/api";
import { TransactionFilters } from "@/types";
import { toQueryParams } from "@/utils/app/toQueryParams";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

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
export type TransactionsQueryParams = Partial<
  TradeModeQueries & TransactionFilters
>;
//#endregion // * ------------ Shared types ------------
//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ queryParams: TransactionsQueryParams }>;
//#endregion // * ------------ Internal types ------------
