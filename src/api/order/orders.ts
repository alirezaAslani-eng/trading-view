// --- orders ---

import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
  PaginationQueries,
} from "@/v2-architecture/src/api";
import { OrdersResponse } from "@/api/types";
import { TradeModeQueries } from "@/v2-architecture/src/features/trading/api";
import { QueryParams, toQueryParams } from "@/utils/app/toQueryParams";
import { DateFilterQueries } from "@/types";

const url = apiClient.authBaseURL("/api/v1/orders/list");

export const orders = async ({
  signal,
  queryParams,
}: Config): Promise<OrdersResponse> => {
  const query = new URLSearchParams(toQueryParams(queryParams)).toString();
  const res = await apiClient.get(`${url}?${query}`, { signal });
  const raw = await apiError.jsonHandler<BaseApiResponse<OrdersResponse>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type OrdersQueryParams = QueryParams<{
  orderSide: string;
  productCode: string;
  status: string;
  viewType: string;
}> &
  TradeModeQueries &
  DateFilterQueries &
  PaginationQueries;
//#endregion

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ queryParams: OrdersQueryParams }>;
//#endregion
