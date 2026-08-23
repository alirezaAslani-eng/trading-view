import { JALALI_FORMAT } from "@/constant/app/date";
import { convertToJalali } from "@/packages/dayjs";
import { Notification } from "@/v2-architecture/src/entity/notification";
import { NotificationType } from "@/v2-architecture/src/entity/notification/types";
import { Box, Stack, Typography } from "@mui/material";
import {
  CheckedIcon,
  WarningCircleIcon,
  WarningIcon,
} from "@/components/ui/Icon";

interface NotificationItemProps {
  notification: Notification;
  onClick?: (notification: Notification) => void;
  isLoading?: boolean;
}

const notificationIcon = {
  success: CheckedIcon,
  error: WarningCircleIcon,
  warning: WarningIcon,
  info: WarningCircleIcon,
};

const notificationColor: Record<NotificationType, string> = {
  success: "status.profit",
  error: "status.loss",
  warning: "status.warning",
  info: "text.primary",
} as const;

function formatNotificationTime(timestamp: number) {
  return convertToJalali(timestamp * 1000).format(JALALI_FORMAT);
}

export default function NotificationItem({
  notification,
  onClick,
  isLoading = false,
}: NotificationItemProps) {
  const Icon = notificationIcon[notification.type];

  return (
    <Box
      component="button"
      type="button"
      onClick={() => onClick?.(notification)}
      disabled={isLoading}
      sx={{
        position: "relative",
        width: "100%",
        border: 0,
        outline: 0,
        textAlign: "right",
        cursor: isLoading ? "default" : "pointer",
        backgroundColor: notification.isRead
          ? "transparent"
          : "background.surfaceLevel3",
        px: 2,
        py: 1.5,
        color: "inherit",
        transition: "background-color 150ms ease",

        "&:hover": {
          backgroundColor: "background.surfaceLevel4",
        },

        "&:disabled": {
          opacity: 0.7,
        },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            minWidth: 32,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.surfaceLevel4",
            color: notificationColor[notification.type],
          }}
        >
          <Icon
            sx={{
              fontSize: 18,
            }}
          />
        </Box>

        <Stack
          sx={{
            minWidth: 0,
            flex: 1,
            display: "flex",
            gap: 0.5,
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 0.75,
            }}
          >
            {!notification.isRead && (
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  minWidth: 6,
                  borderRadius: "50%",
                  backgroundColor: "primary.main",
                }}
              />
            )}

            <Typography
              variant="body3"
              sx={{
                color: "text.heading",
                fontFamily: notification.isRead
                  ? "var(--iranyekan-regular)"
                  : "var(--iranyekan-medium)",
              }}
            >
              {notification.title}
            </Typography>
          </Stack>

          <Typography
            variant="body4"
            sx={{
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {notification.message}
          </Typography>

          <Typography
            variant="caption2"
            sx={{
              color: "text.tertiary",
              mt: 0.25,
            }}
          >
            {formatNotificationTime(notification.createdAt)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
