import { JALALI_FORMAT } from "@/constant/app/date";
import { convertToJalali } from "@/packages/dayjs";
import { BaseApiResponse } from "@/types";
import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const url = (params: ProductTrendParams, queries?: string) =>
  apiClient.authBaseURL(
    `/api/v1/market/dashboard/trend/${params.symbol}?days=17`,
  );

export const productTrend = async ({
  signal,
  params,
}: Config): Promise<ProductTrendData> => {
  const res = await apiClient.get(url(params), {
    signal,
  });

  const raw =
    await apiError.jsonHandler<BaseApiResponse<ProductTrendData>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type ProductTrendData = {
  date: string;
  price: number;
  volume: number;
}[];
type ProductTrendParams = {
  symbol: string;
};
type Config = ApiConfig<{ params: ProductTrendParams }>;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ transformers ------------
export function toProductTrendChart(data: ProductTrendData) {
  return {
    prices: data.map((item) => item.price),
    dates: data.map((item) => convertToJalali(item.date).format(JALALI_FORMAT)),
  };
}
//#endregion // * ------------ transformers ------------
