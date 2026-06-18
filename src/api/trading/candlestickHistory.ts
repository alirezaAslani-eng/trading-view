import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import { ApiOptions } from "@/types";
import {
  CandlestickHistoryQueries,
  CandlestickHistoryResponse,
} from "@/api/types";

const getUrlQueries = (queries: CandlestickHistoryQueries) => {
  const searchParams = new URLSearchParams({ ...queries });
  return `${process.env.NEXT_PUBLIC_BASEURL}/api/udf/history?${searchParams.toString()}`;
};

interface CandlestickHistoryConfig extends Required<
  Pick<ApiOptions<{}, CandlestickHistoryQueries>, "queries">
> {}
async function candlestickHistory({
  queries,
}: CandlestickHistoryConfig): Promise<CandlestickHistoryResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(getUrlQueries(queries), {
      ...sharedRequestInit,
      method: "GET",
    });
    return response;
  })) as Response;

  const data = (await handleApiResponse(res)) as CandlestickHistoryResponse;

  return data;
}

export default candlestickHistory;
