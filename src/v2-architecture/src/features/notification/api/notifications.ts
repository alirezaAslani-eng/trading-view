import { Notification } from "@/v2-architecture/src/entity/notification";
import { toQueryParams } from "@/utils/app/toQueryParams";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
  PaginationQueries,
  PaginationResponse,
} from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/user/notifications");

export const notifications = async ({
  signal,
  queryParams,
}: Config): Promise<NotificationsData> => {
  const query = new URLSearchParams(toQueryParams(queryParams)).toString();
  const res = await apiClient.get(`${url}?${query}`, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<NotificationsData>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type NotificationsData = PaginationResponse<Notification[]> & {
  unreadCount: number;
};
export type NotificationsQueryParams = PaginationQueries;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ queryParams: NotificationsQueryParams }>;
//#endregion // * ------------ Internal types ------------
