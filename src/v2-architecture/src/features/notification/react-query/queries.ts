// --- queries.ts (addition) ---
import { queryOptions } from "@tanstack/react-query";
import { notificationsDynamicKey } from "./keys";
import { notifications, NotificationsQueryParams } from "../api";

export const notificationsConfig = (filters: NotificationsQueryParams) =>
  queryOptions({
    queryKey: notificationsDynamicKey(filters),
    queryFn: ({ signal }) => {
      return notifications({ signal, queryParams: filters });
    },
  });
