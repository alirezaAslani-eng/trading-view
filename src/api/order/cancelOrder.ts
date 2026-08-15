// --- cancelOrder ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { TradeModeVariables } from "@/v2-architecture/src/features/trading/api";

const url = (params: CancelOrderParams) =>
  apiClient.authBaseURL(`/api/v1/orders/${params.orderId}/cancel`);

export const cancelOrder = async ({
  signal,
  params,
  body,
}: Config): Promise<CancelOrderData> => {
  const res = await apiClient.put(url(params), {
    signal,
    body: JSON.stringify(body),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type CancelOrderData = void; // * the api doesn't return anything
export type CancelOrderVariables = TradeModeVariables;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
export interface CancelOrderParams {
  orderId: string | number;
}
type Config = ApiConfig<{
  params: CancelOrderParams;
  body: CancelOrderVariables;
}>;
//#endregion // * ------------ Internal types ------------
