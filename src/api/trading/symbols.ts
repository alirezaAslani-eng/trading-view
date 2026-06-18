import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { SymbolsResponse } from "@/api/types";

const URL = `${process.env.NEXT_PUBLIC_BASEURL}/api/udf/all-symbols`;

async function symbols(): Promise<SymbolsResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL);
    return response;
  })) as Response;

  const data = (await handleApiResponse(res)) as SymbolsResponse;

  return data;
}

export default symbols;
