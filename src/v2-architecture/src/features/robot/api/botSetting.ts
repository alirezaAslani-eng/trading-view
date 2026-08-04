import { ConfigureBotSchema } from "@/validations/robot/configureBotSchema";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const URL = apiClient.authBaseURL("/api/v1/admin/market-maker/configs");

export const botSetting = async ({
  signal,
}: ApiConfig = {}): Promise<BotSettingData> => {
  const res = await apiClient.get(URL, { signal });
  const raw = await apiError.jsonHandler<BaseApiResponse<BotSettingData>>(res);
  return raw.data;
};

//#region // * ------------ Shared Types ------------
export type BotSettingData = ConfigureBotSchema[];
//#endregion // * ------------ Shared Types ------------
