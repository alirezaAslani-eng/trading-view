// --- placeOrder ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { TradeFormSchemaOutputType } from "@/validations/types/trade.types";
import { booleanToNumber } from "@/v2-architecture/src/shared/utils";
import {
  SettlementModeVariables,
  TradeModeVariables,
} from "@/v2-architecture/src/features/trading/api";
import { SharedHeaders } from "../sharedHeaders";

const url = apiClient.authBaseURL("/api/v1/orders");

export const placeOrder = async ({
  signal,
  body,
}: Config): Promise<PlaceOrderData> => {
  const res = await apiClient.post(url, {
    signal,
    headers: {
      ...new SharedHeaders(),
    },
    body: JSON.stringify({
      ...body,
      settlementMode: booleanToNumber(body.settlementMode),
    }),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type PlaceOrderData = void; // * the api doesn't return anything
export type PlaceOrderVariables = TradeFormSchemaOutputType &
  TradeModeVariables &
  SettlementModeVariables;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ body: PlaceOrderVariables }>;
//#endregion // * ------------ Internal types ------------
