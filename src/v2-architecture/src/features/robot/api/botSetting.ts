import { ConfigureBotSchema } from "@/validations/robot/configureBotSchema";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const URL = apiClient.authBaseURL("/api/v1/admin/market-maker/bots");

export const botSetting = async ({
  signal,
  params,
}: Config): Promise<BotSettingData> => {
  const res = await apiClient.get(`${URL}/${params.botId}`, { signal });
  const raw = await apiError.jsonHandler<BaseApiResponse<BotSettingData>>(res);
  return { ...raw.data, settlementMode: !!raw.data.settlementMode };
};

type Config = ApiConfig<{ params: BotSettingParams }>;
//#region // * ------------ Shared Types ------------
export type BotSettingData = ConfigureBotSchema;
export type BotSettingParams = { botId: string };
//#endregion // * ------------ Shared Types ------------
