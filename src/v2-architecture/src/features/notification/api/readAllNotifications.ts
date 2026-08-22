// --- readAllNotifications ---
import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/user/notifications/read-all");

export const readAllNotifications = async ({
  signal,
}: ApiConfig = {}): Promise<ReadAllNotificationsData> => {
  const res = await apiClient.put(url, { signal });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type ReadAllNotificationsData = void; // * the api doesn't return anything
//#endregion // * ------------ Shared types ------------
