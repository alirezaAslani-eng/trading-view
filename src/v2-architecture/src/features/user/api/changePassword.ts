import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { ChangePasswordSchema } from "../validation";

const url = apiClient.authBaseURL("/api/v1/identity/change-password");

export const changePassword = async ({
  signal,
  body,
}: Config): Promise<ChangePasswordData> => {
  const { confirmNewPassword, ...payload } = body;
  const res = await apiClient.post(url, {
    signal,
    body: JSON.stringify(payload),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type ChangePasswordData = void; // * the api doesn't return anything
export type ChangePasswordVariables = ChangePasswordSchema;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ body: ChangePasswordVariables }>;
//#endregion // * ------------ Internal types ------------
