// --- configureBot ---
import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { ConfigureBotSchemaOutput } from "@/validations/robot/configureBotSchema";

const url = apiClient.authBaseURL("/api/v1/admin/market-maker/configs");

export const configureBot = async ({
  signal,
  body,
}: Config): Promise<ConfigureBotData> => {
  const res = await apiClient.put(url, {
    signal,
    body: JSON.stringify([body]),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type ConfigureBotData = void; // * the api doesn't return anything
export type ConfigureBotVariables = ConfigureBotSchemaOutput;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ body: ConfigureBotVariables }>;
//#endregion // * ------------ Internal types ------------
