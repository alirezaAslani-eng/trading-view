// --- readNotification ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const url = (params: ReadNotificationParams) =>
  apiClient.authBaseURL(`/api/v1/user/notifications/${params.id}/read`);

export const readNotification = async ({
  signal,
  params,
}: Config): Promise<ReadNotificationData> => {
  const res = await apiClient.put(url(params), { signal });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type ReadNotificationData = void; // * the api doesn't return anything
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
export interface ReadNotificationParams {
  id: number;
}
type Config = ApiConfig<{ params: ReadNotificationParams }>;
//#endregion // * ------------ Internal types ------------
