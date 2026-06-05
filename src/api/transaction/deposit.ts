import fetchHandler from "@/utils/app/fetchHandler";
import mutationFetch from "@/utils/app/mutationFetch";
import { sharedRequestInit } from "../sharedRequestInit";
import responseErrorHandler from "@/utils/app/responseErrorHandler";

type DepositPayload = {
  amount: number;
  referenceId: string;
};

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/wallet/deposit`;

async function deposit(body: DepositPayload): Promise<void> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body satisfies DepositPayload),
    });

    return res;
  })) as Response;

  await responseErrorHandler(res);
}

export type { DepositPayload };
export default deposit;
