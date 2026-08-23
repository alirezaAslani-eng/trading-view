// --- keys.ts (addition) ---

export const notificationsKey = ["notifications"];
export const notificationsDynamicKey = (pageSize: number) => [
  ...notificationsKey,
  pageSize,
];
