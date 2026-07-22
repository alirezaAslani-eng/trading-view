import fetchHandler from "@/utils/app/fetchHandler";
import mutationFetch from "@/utils/app/mutationFetch";
import { sharedRequestInit } from "../sharedRequestInit";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { buildTradeModeQueries } from "@/packages/react-query/config/helpers";
import { TradeModeStore } from "@/context/feature/trade/TradeMode/helpers";

type DepositPayload = {
  amount: number;
  referenceId: string;
};

const URL = () => {
  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/wallet/deposit`;
};

async function deposit(body: DepositPayload): Promise<void> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL(), {
      ...sharedRequestInit,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        isdemo: TradeModeStore.getTradeModeConfig().isDemo,
      }),
    });

    return res;
  })) as Response;

  await handleApiResponse(res);
}

export type { DepositPayload };
export default deposit;
