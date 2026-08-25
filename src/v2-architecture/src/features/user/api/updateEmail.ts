// --- updateEmail ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { UpdateEmailSchema } from "../validation";

const url = apiClient.authBaseURL("/api/v1/user/profile");

export const updateEmail = async ({
  signal,
  body,
}: Config): Promise<UpdateEmailData> => {
  const res = await apiClient.put(url, { signal, body: JSON.stringify(body) });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type UpdateEmailData = void; // * the api doesn't return anything
export type UpdateEmailVariables = UpdateEmailSchema;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ body: UpdateEmailVariables }>;
//#endregion // * ------------ Internal types ------------
