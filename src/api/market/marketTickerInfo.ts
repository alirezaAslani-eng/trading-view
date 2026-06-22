import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { MarketTickerInfoResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { BaseApiResponse } from "@/types";

const URL = (tickerName: string) =>
  `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/market/tickers/${tickerName}`;

async function marketTickerInfo(
  tickerName: string,
): Promise<MarketTickerInfoResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(tickerName), {
      ...sharedRequestInit,
    });
    return response;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<MarketTickerInfoResponse>;

  return data.data;
}

export default marketTickerInfo;
