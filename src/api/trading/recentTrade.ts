import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { RecentTradeResponse, SymbolDetailsResponse } from "@/api/types";
import { BaseApiResponse } from "@/types";

const URL = (symbol:string) =>
 
  `${process.env.BASEURL}/api/v1/market/tickers/${symbol}/price-history?limit=50`;

async function recentTrades(
  symbol: string,
): Promise<RecentTradeResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(symbol));
    return response;
  })) as Response;

  const data = (await handleApiResponse(res)) as BaseApiResponse<RecentTradeResponse>;

  return data.data;
}

export default recentTrades;

