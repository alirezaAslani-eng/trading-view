import { NotificationType } from "@/v2-architecture/src/entity/notification/types";

export interface NotificationSocketPayload {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  time: number;
}
