// --- portfolioTrend ---

import { JALALI_FORMAT } from "@/constant/app/date";
import { convertToJalali } from "@/packages/dayjs";
import { TradeModeQueries } from "@/v2-architecture/src/features/trading/api";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";
import { toQueryParams } from "@/utils/app/toQueryParams";

const url = apiClient.authBaseURL("/api/v1/wallet/portfolio/chart");

export const portfolioTrend = async ({
  signal,
  queryParams,
}: Config = {}): Promise<PortfolioTrendData> => {
  const query = new URLSearchParams(toQueryParams(queryParams)).toString();
  const res = await apiClient.get(`${url}?${query}`, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<PortfolioTrendData>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type PortfolioTrendData = {
  time: number;
  value: number;
}[];
export type PortfolioTrendQueryParams = TradeModeQueries;
//#endregion // * ------------ Shared types ------------

type Config = ApiConfig<{ queryParams?: PortfolioTrendQueryParams }>;

//#region // * ------------ transfomers ------------
export const toProtfolioTrendChart = (data: PortfolioTrendData) => {
  return {
    prices: data.map((item) => item.value),
    dates: data.map((item) =>
      convertToJalali(item.time * 1000).format(JALALI_FORMAT),
    ),
  };
};
//#endregion // * ------------ transfomers ------------
