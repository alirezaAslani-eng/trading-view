import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import { CancleOrderParam } from "../types";

const URL = (orderID: CancleOrderParam) => {
  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/orders/${orderID}/cancel`;
};

async function cancleOrder(orderID: CancleOrderParam): Promise<void> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(orderID), {
      ...sharedRequestInit,
      method: "PUT",
    });

    return response;
  })) as Response;

  await handleApiResponse(res);
}

export default cancleOrder;
