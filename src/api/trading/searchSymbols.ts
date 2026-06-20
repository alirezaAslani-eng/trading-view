// /api/udf/search?query=REBAR&type

import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { SearchSymbolsResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { BaseApiResponse } from "@/types";

const URL = (query: string) =>
  `${process.env.NEXT_PUBLIC_BASEURL}/api/udf/search?query=${query}`;

async function searchSymbols(query: string): Promise<SearchSymbolsResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(query), {
      ...sharedRequestInit,
    });
    return response;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<SearchSymbolsResponse>;

  return data.data;
}

export default searchSymbols;
