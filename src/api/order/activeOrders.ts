import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { UserOrdersResponse, MarketTickersResponse } from "@/api/types";
import { BaseApiResponse, PaginationQueries } from "@/types";
import { sharedRequestInit } from "../sharedRequestInit";

const URL = (queries?: PaginationQueries) => {
  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/orders/active?${new URLSearchParams(queries)}`;
};

async function activeOrders(
  queries?: PaginationQueries,
): Promise<UserOrdersResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(queries), {
      ...sharedRequestInit,
      method: "GET",
    });

    return response;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<UserOrdersResponse>;

  return data.data;
}

export default activeOrders;
