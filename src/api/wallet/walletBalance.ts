import { sharedRequestInit } from "../sharedRequestInit";
import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { WalletBalanceResponse } from "../types";
import { BaseApiResponse } from "@/types";
const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/wallet/balance`;

async function walletBalance(
  options?: RequestInit,
): Promise<WalletBalanceResponse> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL, {
      ...sharedRequestInit,
      ...options,
    });
    return res;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<WalletBalanceResponse>;

  return data.data;
}

export default walletBalance;
