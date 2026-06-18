import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { TradingViewConfigResponse } from "@/api/types";

const URL = `${process.env.NEXT_PUBLIC_BASEURL}/api/udf/config`;
async function tradingViewConfig(): Promise<TradingViewConfigResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL);
    return response;
  })) as Response;

  const data = (await handleApiResponse(res)) as TradingViewConfigResponse;

  return data;
}

export default tradingViewConfig;
