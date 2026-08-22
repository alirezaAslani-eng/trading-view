import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { notificationsKey } from "./keys";
import {
  readAllNotifications,
  readNotification,
  ReadNotificationParams,
} from "../api";

export const readAllNotificationsConfig = createMutationOptions({
  meta: {
    successMessage: "همه اعلان‌ها خوانده شد",
    invalidates: [notificationsKey],
  },
  mutationFn: () => {
    return readAllNotifications();
  },
});

// --- mutations.ts (addition) ---

export const readNotificationConfig = createMutationOptions({
  meta: { invalidates: [notificationsKey] },
  mutationFn: (vars: ReadNotificationParams) => {
    return readNotification({ params: vars });
  },
});
