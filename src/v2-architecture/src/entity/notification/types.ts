export type NotificationType = "success" | "error" | "warning" | "info";
export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: number;
}
