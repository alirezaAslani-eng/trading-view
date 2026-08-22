// --- keys.ts (addition) ---
import type { NotificationsQueryParams } from "../api";

export const notificationsKey = ["notifications"];
export const notificationsDynamicKey = (filters: NotificationsQueryParams) => [
  ...notificationsKey,
  filters,
];
