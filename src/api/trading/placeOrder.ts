import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import { SharedHeaders } from "../sharedHeaders";
import mutationFetch from "@/utils/app/mutationFetch";
import { TradeFormSchemaOutputType } from "@/validations/types/trade.types";
import { buildTradeModeQueries } from "@/packages/react-query/config/helpers";
import { TradeModeStore } from "@/context/feature/trade/TradeMode/helpers";

const URL = () => {
  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/orders`;
};
async function placeOrder(orderInfo: TradeFormSchemaOutputType): Promise<void> {
  const res = (await fetchHandler(async () => {
    const response = await mutationFetch(URL(), {
      method: "POST",
      ...sharedRequestInit,
      body: JSON.stringify({
        ...orderInfo,
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

export default placeOrder;
