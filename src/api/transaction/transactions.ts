import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { TransactionsResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { ApiOptions, BaseApiResponse } from "@/types";

type TransactionsConfig = ApiOptions<{ queries?: string }>;

const URL = (queries?: string) =>
  `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/wallet/transactions?${queries ?? ""}`;

async function transactions({
  queries,
  signal,
}: TransactionsConfig): Promise<TransactionsResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(queries), {
      ...sharedRequestInit,
      signal,
    });
    return response;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<TransactionsResponse>;

  return data.data;
}

export default transactions;
