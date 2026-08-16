// --- bots ---

import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/admin/market-maker/bots");

export const tradeRobots = async ({
  signal,
}: ApiConfig = {}): Promise<TradeRoBotsData> => {
  const res = await apiClient.get(url, { signal });
  const raw = await apiError.jsonHandler<BaseApiResponse<TradeRoBotsData>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export interface TradeRobot {
  botId: string;
  symbol: string;
  isActive: boolean;
  manualBasePrice: number;
  targetAssetRatio: number;
  settlementMode: 0 | 1;
}
export type TradeRoBotsData = TradeRobot[];
//#endregion // * ------------ Shared types ------------
