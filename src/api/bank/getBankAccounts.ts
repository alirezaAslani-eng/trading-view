import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { BaseApiResponse } from "@/types";
import { BankAccountsResponse } from "@/api/types/bank.types";
import { sharedRequestInit } from "../sharedRequestInit";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/kyc/bank-accounts`;

async function getBankAccounts(): Promise<BankAccountsResponse> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL, sharedRequestInit);
    return res;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<BankAccountsResponse>;

  return data.data;
}

export default getBankAccounts;
