// --- portfolioTrend ---

import { JALALI_FORMAT } from "@/constant/app/date";
import { convertToJalali } from "@/packages/dayjs";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/wallet/portfolio/chart");

export const portfolioTrend = async ({
  signal,
}: ApiConfig = {}): Promise<PortfolioTrendData> => {
  const res = await apiClient.get(url, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<PortfolioTrendData>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type PortfolioTrendData = {
  time: number;
  value: number;
}[];
//#endregion // * ------------ Shared types ------------

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
