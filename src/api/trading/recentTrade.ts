import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { RecentTradeResponse } from "@/api/types";
import { BaseApiResponse } from "@/types";
import { sharedRequestInit } from "../sharedRequestInit";

const URL = (symbol: string) =>
  `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/market/tickers/${symbol}/price-history?limit=50`;

async function recentTrades(
  symbol: string,
): Promise<RecentTradeResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(symbol), {
      ...sharedRequestInit,
      method: "GET",
    });

    return response;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<RecentTradeResponse>;

  return data.data;
}

export default recentTrades;