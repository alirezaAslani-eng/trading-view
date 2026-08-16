// --- configureBot ---
import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { booleanToNumber } from "@/v2-architecture/src/shared/utils";
import { ConfigureBotSchemaOutput } from "@/validations/robot/configureBotSchema";
import { v4 as uuid } from "uuid";
const url = apiClient.authBaseURL("/api/v1/admin/market-maker/bots");

export const createTradeRobot = async ({
  signal,
  body,
}: Config): Promise<CreateTradeRoBotData> => {
  const res = await apiClient.post(url, {
    signal,
    body: JSON.stringify({
      ...body,
      settlementMode: booleanToNumber(body.settlementMode),
      botId: uuid(),
    }),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type CreateTradeRoBotData = void; // * the api doesn't return anything
export type CreateRobotVariables = ConfigureBotSchemaOutput;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{
  body: CreateRobotVariables;
}>;
//#endregion // * ------------ Internal types ------------
