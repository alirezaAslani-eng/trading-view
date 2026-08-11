import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { Symbol, SymbolsResponse } from "@/api/types";
import { BaseApiResponse } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_BASEURL}/api/udf/all-symbols`;

async function symbols(): Promise<SymbolsResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL);
    return response;
  })) as Response;

  const data = (await handleApiResponse(
    res
  )) as BaseApiResponse<SymbolsResponse>;

  return data.data;
}

export default symbols;

//#region // * ------------ Transformers ------------
export const symbolsWithDefault = (
  symbols: SymbolsResponse
): { defSymbol: Symbol; symbols: SymbolsResponse } => {
  return {
    defSymbol: symbols[1],
    symbols,
  };
};
//#endregion // * ------------ Transformers ------------
