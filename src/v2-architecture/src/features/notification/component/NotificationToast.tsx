"use client";
import { Box, Stack, Typography } from "@mui/material";
import { NotificationType } from "@/v2-architecture/src/entity/notification/types";
import { lineClamp } from "@/packages/mui/theme";
import {
  CheckedIcon,
  NotificationIcon,
  WarningCircleIcon,
  WarningIcon,
} from "@/components/ui/Icon";
import { NotificationSocketPayload } from "../types";

interface NotificationToastProps {
  notification: NotificationSocketPayload;
}

const notificationIcon = {
  success: CheckedIcon,
  error: WarningCircleIcon,
  warning: WarningIcon,
  info: NotificationIcon,
};

const notificationColor: Record<NotificationType, string> = {
  success: "status.profit",
  error: "status.loss",
  warning: "status.warning",
  info: "text.primary",
} as const;

const notificationBackground: Record<NotificationType, string> = {
  success: "status.profit",
  error: "status.loss",
  warning: "status.warning",
  info: "background.surfaceLevel4",
} as const;

export default function NotificationToast({
  notification,
}: NotificationToastProps) {
  const Icon = notificationIcon[notification.type];

  return (
    <Box
      dir="rtl"
      sx={{
        width: 360,
        maxWidth: "calc(100vw - 32px)",
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "border.secondary",
        borderRadius: 2,
        boxShadow: 8,
        overflow: "hidden",
        p: 1.5,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 1.5,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 40,
            height: 40,
            minWidth: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: notificationBackground[notification.type],
            color: notificationColor[notification.type],
          }}
        >
          <Icon />
        </Box>

        {/* Content */}
        <Stack
          sx={{
            minWidth: 0,
            flex: 1,
            display: "flex",
            gap: 0.5,
          }}
        >
          <Typography variant="body3">{notification.title}</Typography>

          <Typography
            variant="body4"
            sx={{
              color: "text.secondary",
              ...lineClamp(3),
            }}
          >
            {notification.message}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
