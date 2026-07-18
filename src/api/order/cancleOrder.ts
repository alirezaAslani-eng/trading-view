import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import { CancleOrderParam } from "../types";
import { SharedHeaders } from "../sharedHeaders";
import { buildTradeModeQueries } from "@/packages/react-query/config/helpers";

const URL = (orderID: CancleOrderParam) => {
  const queries = new URLSearchParams(buildTradeModeQueries()).toString();

  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/orders/${orderID}/cancel?${queries}`;
};

async function cancleOrder(orderID: CancleOrderParam): Promise<void> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(orderID), {
      ...sharedRequestInit,
      method: "PUT",
      headers: {
        ...new SharedHeaders(),
      },
    });

    return response;
  })) as Response;

  await handleApiResponse(res);
}

export default cancleOrder;
