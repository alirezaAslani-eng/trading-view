import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { SymbolDetailsResponse } from "@/api/types";

const URL = (symbolName: string) =>
  `${process.env.NEXT_PUBLIC_BASEURL}/api/udf/symbols?symbol=${symbolName}`;

async function symbolDetails(
  symbolName: string,
): Promise<SymbolDetailsResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(symbolName));
    return response;
  })) as Response;

  const data = (await handleApiResponse(res)) as SymbolDetailsResponse;

  return data;
}

export default symbolDetails;
