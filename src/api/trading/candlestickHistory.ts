import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import { LegacyApiOptions, BaseApiResponse } from "@/types";
import {
  CandlestickHistoryQueries,
  CandlestickHistoryResponse,
} from "@/api/types";

const URL = (queries: CandlestickHistoryQueries) => {
  const searchParams = new URLSearchParams({ ...queries });
  return `${process.env.NEXT_PUBLIC_BASEURL}/api/udf/history?${searchParams.toString()}`;
};

interface CandlestickHistoryConfig extends Required<
  Pick<LegacyApiOptions<{}, CandlestickHistoryQueries>, "queries">
> {}
async function candlestickHistory({
  queries,
}: CandlestickHistoryConfig): Promise<CandlestickHistoryResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(queries), {
      ...sharedRequestInit,
    });
    return response;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<CandlestickHistoryResponse>;

  return data.data;
}

export default candlestickHistory;
