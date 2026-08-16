// --- toggleBot ---
import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const url = (params: ToggleTradeBotParams) =>
  apiClient.authBaseURL(
    `/api/v1/admin/market-maker/bots/${params.botId}/toggle`,
  );

export const toggleTradeBot = async ({
  signal,
  params,
  body,
}: Config): Promise<ToggleBotData> => {
  const res = await apiClient.patch(url(params), {
    signal,
    body: JSON.stringify(body),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type ToggleBotData = void; // * the api doesn't return anything
export type ToggleTradeBotVariables = { isActive: boolean };
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
export interface ToggleTradeBotParams {
  botId: string;
}
type Config = ApiConfig<{
  params: ToggleTradeBotParams;
  body: ToggleTradeBotVariables;
}>;
//#endregion // * ------------ Internal types ------------
