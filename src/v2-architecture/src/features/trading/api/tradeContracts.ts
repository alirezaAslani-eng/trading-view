// --- tradeContracts ---
import { TradeContract } from "@/v2-architecture/src/entity/trading";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/wallet/credit/contracts");

export const tradeContracts = async ({
  signal,
}: ApiConfig = {}): Promise<TradeContractsData> => {
  const res = await apiClient.get(url, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<TradeContractsData>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type TradeContractsData = TradeContract[];
//#endregion // * ------------ Shared types ------------
