import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { TransactionsResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";

const URL = (queries?: string) =>
  `/api/v1/wallet/transactions?${queries ?? ""}`;

async function transactions({
  queries,
}: {
  queries: string;
}): Promise<TransactionsResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(queries), {
      ...sharedRequestInit,
    });
    return response;
  })) as Response;

  const data = (await handleApiResponse(res)) as TransactionsResponse;

  return data;
}

export default transactions;
