import { sharedRequestInit } from "../sharedRequestInit";
import { createApiUrl } from "@/utils";
import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responseErrorHandler";
import jsonParseHandler from "@/utils/app/jsonParseHandler";
import { WalletBalanceResponse } from "../types";
import { BaseApiResponse } from "@/types";
import api from "../api";
const URL = createApiUrl("/api/v1/wallet/balance");

async function walletBalance(
  options?: RequestInit,
): Promise<WalletBalanceResponse> {
  const res = (await fetchHandler(async () => {
    const res = await api(URL, {
      ...sharedRequestInit,
      ...options,
    });
    return res;
  })) as Response;

  await responseErrorHandler(res);

  const data = (await jsonParseHandler(
    res,
  )) as BaseApiResponse<WalletBalanceResponse>;
  return data.data;
}

export default walletBalance;
