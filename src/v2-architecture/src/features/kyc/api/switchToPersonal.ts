// --- switchToPersonal ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/auth/switch-personal");

export const switchToPersonal = async ({
  signal,
}: ApiConfig = {}): Promise<SwitchToPersonalData> => {
  const res = await apiClient.post(url, { signal });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type SwitchToPersonalData = void; // * the api doesn't return anything
//#endregion // * ------------ Shared types ------------
