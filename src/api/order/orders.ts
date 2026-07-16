import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { OrdersResponse } from "@/api/types";
import { ApiOptions, BaseApiResponse } from "@/types";
import { sharedRequestInit } from "../sharedRequestInit";

type OrdersConfig = ApiOptions<{ queries?: string }>;

const URL = ({ queries }: Pick<OrdersConfig, "queries">) => {
  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/orders/list?${queries}`;
};

async function orders({
  signal,
  queries,
}: OrdersConfig): Promise<OrdersResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL({ queries }), {
      ...sharedRequestInit,
      signal,
      method: "GET",
    });

    return response;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<OrdersResponse>;

  return data.data;
}

export default orders;
