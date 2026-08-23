// --- queries.ts (addition) ---
import { notificationsDynamicKey, notificationsKey } from "./keys";
import { notifications, NotificationsData } from "../api";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { getNextPageParam } from "@/v2-architecture/src/api";

export const notificationsInfiniteConfig = (pageSize: number = 10) =>
  infiniteQueryOptions({
    queryKey: notificationsDynamicKey(pageSize),
    initialPageParam: 1,
    getNextPageParam,

    queryFn: ({ signal, pageParam }) => {
      return notifications({
        signal,
        queryParams: {
          pageSize,
          page: pageParam,
        },
      });
    },
    select(data): Pick<NotificationsData, "items" | "unreadCount"> {
      return {
        unreadCount: data.pages[0]?.unreadCount ?? 0,
        items: data.pages.flatMap((item) => {
          return item.items;
        }),
      };
    },
  });
