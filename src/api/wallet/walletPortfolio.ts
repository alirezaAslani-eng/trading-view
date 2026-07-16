import { sharedRequestInit } from "../sharedRequestInit";
import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { WalletPortfolioResponse } from "../types";
import { ApiOptions, BaseApiResponse } from "@/types";
const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/wallet/portfolio`;

async function walletBalance({
  signal,
}: ApiOptions): Promise<WalletPortfolioResponse> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL, {
      ...sharedRequestInit,
      signal,
    });
    return res;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<WalletPortfolioResponse>;
  console.log("Portofolio", data);

  return data.data;
}

export default walletBalance;
