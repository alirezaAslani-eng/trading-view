import fetchHandler from "@/utils/app/fetchHandler";
import mutationFetch from "@/utils/app/mutationFetch";
import { sharedRequestInit } from "../sharedRequestInit";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { buildTradeModeQueries } from "@/packages/react-query/config/helpers";

type DepositPayload = {
  amount: number;
  referenceId: string;
};

const URL = () => {
  const queries: string = new URLSearchParams(
    buildTradeModeQueries()
  ).toString();
  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/wallet/deposit?${queries}`;
};

async function deposit(body: DepositPayload): Promise<void> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL(), {
      ...sharedRequestInit,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body satisfies DepositPayload),
    });

    return res;
  })) as Response;

  await handleApiResponse(res);
}

export type { DepositPayload };
export default deposit;
