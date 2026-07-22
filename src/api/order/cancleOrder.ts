import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import { CancleOrderParam } from "../types";
import { SharedHeaders } from "../sharedHeaders";
import { TradeModeStore } from "@/context/feature/trade/TradeMode/helpers";

const URL = (orderID: CancleOrderParam) => {
  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/orders/${orderID}/cancel`;
};

async function cancleOrder(orderID: CancleOrderParam): Promise<void> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(orderID), {
      ...sharedRequestInit,
      method: "PUT",
      body: JSON.stringify({
        isdemo: TradeModeStore.getTradeModeConfig().isDemo,
      }),
      headers: {
        ...new SharedHeaders(),
        "Content-Type": "application/json",
      },
    });

    return response;
  })) as Response;

  await handleApiResponse(res);
}

export default cancleOrder;
