import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { OrdersResponse, OrdersApiConfig } from "@/api/types";
import { BaseApiResponse } from "@/types";
import { sharedRequestInit } from "../sharedRequestInit";

const URL = ({
  params,
  queries,
}: Pick<OrdersApiConfig, "params" | "queries">) => {
  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/orders/${params.view}?${queries}`;
};

async function orders({
  queries,
  params,
}: OrdersApiConfig): Promise<OrdersResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL({ params, queries }), {
      ...sharedRequestInit,
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
