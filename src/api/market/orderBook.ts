import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { OrderBookResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { BaseApiResponse } from "@/types";

const URL = (symbol: string) =>
  `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/market/depth/${symbol}`;

async function orderBook(symbol: string): Promise<OrderBookResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(symbol), {
      ...sharedRequestInit,
    });
    return response;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<OrderBookResponse>;

  return data.data;
}

export default orderBook;
