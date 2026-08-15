// --- walletBalance ---
import { WalletPortfolioResponse } from "../types";
import { TradeModeQueries } from "@/v2-architecture/src/features/trading/api";
import { toQueryParams } from "@/utils/app/toQueryParams";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/wallet/portfolio");

export const walletPortfolio = async ({
  signal,
  queryParams,
}: Config): Promise<WalletPortfolioResponse> => {
  const query = new URLSearchParams(toQueryParams(queryParams)).toString();
  const res = await apiClient.get(`${url}?${query}`, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<WalletPortfolioResponse>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type WalletPortfolioQueryParams = TradeModeQueries;
//#endregion
//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ queryParams: WalletPortfolioQueryParams }>;
//#endregion // * ------------ Internal types ------------
