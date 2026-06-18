import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { MarketTickersResponse } from "@/api/types";
import { BaseApiResponse } from "@/types";
import { sharedRequestInit } from "../sharedRequestInit";

const URL = `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/market/tickers`;

type MarketTickersApiResponse =
  | MarketTickersResponse
  | BaseApiResponse<MarketTickersResponse>;

function getTickersData(data: MarketTickersApiResponse): MarketTickersResponse {
  if (Array.isArray(data)) return data;
  return data.data
}

async function getMarketTickers(): Promise<MarketTickersResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL, {
      ...sharedRequestInit,
      method: "GET",
    });

    return response;
  })) as Response;

  const data = (await handleApiResponse(res)) as MarketTickersApiResponse;

  return getTickersData(data);
}

export default getMarketTickers;
