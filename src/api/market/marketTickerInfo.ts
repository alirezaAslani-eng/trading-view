import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { MarketTicker } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";

const URL = (tickerName: string) =>
  `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/market/tickers/${tickerName}`;

async function marketTickerInfo(tickerName: string): Promise<MarketTicker> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(tickerName), {
      ...sharedRequestInit,
    });
    return response;
  })) as Response;

  const data = (await handleApiResponse(res)) as MarketTicker;

  return data;
}

export default marketTickerInfo;
