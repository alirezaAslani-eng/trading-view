// --- configureBot ---
import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { booleanToNumber } from "@/v2-architecture/src/shared/utils";
import { ConfigureBotSchemaOutput } from "@/validations/robot/configureBotSchema";

const url = apiClient.authBaseURL("/api/v1/admin/market-maker/bots");

export const configureBot = async ({
  signal,
  body,
  params,
}: Config): Promise<ConfigureBotData> => {
  const res = await apiClient.put(`${url}/${params.botId}`, {
    signal,
    body: JSON.stringify({
      ...body,
      settlementMode: booleanToNumber(body.settlementMode),
    }),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type ConfigureBotData = void; // * the api doesn't return anything
export type ConfigureBotVariables = ConfigureBotSchemaOutput;
//#endregion // * ------------ Shared types ------------

export interface ConfigureBotParams {
  botId: string;
}

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{
  body: ConfigureBotVariables;
  params: ConfigureBotParams;
}>;
//#endregion // * ------------ Internal types ------------
