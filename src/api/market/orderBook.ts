import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { toQueryParams } from "@/utils/app/toQueryParams";
import { BaseApiResponse } from "@/types";
import { booleanToNumber } from "@/v2-architecture/src/shared/utils";
import {
  SettlementModeQueries,
  TradeModeQueries,
} from "@/v2-architecture/src/features/trading/api";

export const orderBook = async ({
  signal,
  params,
  queryParams,
}: Config): Promise<OrderBookData> => {
  const res = await apiClient.get(url({ params, queryParams }), {
    signal,
  });

  const raw = await apiError.jsonHandler<BaseApiResponse<OrderBookData>>(res);
  return {
    ...raw.data,
    symbol: params.symbol,
  };
};

type OrderBook = [number, number];
type Config = ApiConfig<{
  params: OrderBookParams;
  queryParams?: OrderBookQuerieParams;
}>;
//#region // * ------------ Shared types ------------
export interface OrderBookData {
  bids: Array<OrderBook>;
  asks: Array<OrderBook>;
  symbol: string;
}
export type OrderBookQuerieParams = SettlementModeQueries & TradeModeQueries;
export type OrderBookParams = {
  symbol: string;
};
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Helpers ------------
const url = ({
  params,
  queryParams,
}: Pick<Config, "params" | "queryParams">) => {
  return apiClient.authBaseURL(
    `/api/v1/market/depth/${params.symbol}?${toQueryString(queryParams)}`,
  );
};
const toQueryString = (queries?: OrderBookQuerieParams): string => {
  return new URLSearchParams({
    ...toQueryParams({
      ...queries,
      settlementMode: booleanToNumber(!!queries?.settlementMode),
    }),
  }).toString();
};
//#endregion // * ------------ Helpers ------------
