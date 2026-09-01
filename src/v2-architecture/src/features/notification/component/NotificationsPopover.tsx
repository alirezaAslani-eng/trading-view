"use client";
import { NotificationIcon } from "@/components/ui/Icon";
import {
  Box,
  Stack,
  Typography,
  Badge,
  Divider,
  IconButton,
  Popover,
  Skeleton,
} from "@mui/material";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import useMuiMenuState from "@/hooks/app/useMuiMenuState";
import Button from "@/components/ui/Button/Button";
import NotificationCard from "./NotificationCard";
import {
  notificationsInfiniteConfig,
  readAllNotificationsConfig,
} from "@/v2-architecture/src/features/notification/react-query";
import NextLink from "@/components/ui/Link/NextLink";
import { ROUTES } from "@/constant/app/routes";
import { responsiveIconSize } from "@/packages/mui/theme/overriders";

export default function NotificationsPopover() {
  const { anchoreEl, closeMenu, openMenu, isOpenMenu } = useMuiMenuState();

  //#region // * ------------ Notification APIs ------------
  const readAllMutation = useMutation(readAllNotificationsConfig());
  const notificationsQuery = useInfiniteQuery(notificationsInfiniteConfig(6));
  const { isPending, isError } = notificationsQuery;

  const { items: notifications = [], unreadCount = 0 } =
    notificationsQuery.data ?? {};

  const handleReadAll = () => readAllMutation.mutate();
  //#endregion

  return (
    <>
      <IconButton
        onClick={openMenu}
        aria-label="اعلان‌ها"
        sx={{ color: "text.secondary" }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationIcon sx={responsiveIconSize({ xs: "x-large" })} />
        </Badge>
      </IconButton>

      <Popover
        open={isOpenMenu}
        anchorEl={anchoreEl}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 380,
              maxWidth: "calc(100vw - 32px)",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "border.secondary",
              boxShadow: 8,
            },
          },
        }}
      >
        <Box sx={{ width: "100%" }}>
          {/* Header */}
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.75,
            }}
          >
            <Typography
              variant="h7"
              sx={{
                color: "text.heading",
              }}
            >
              اعلان‌ها
            </Typography>

            <Button
              variant="on-surface"
              size="small"
              onClick={handleReadAll}
              disabled={
                isPending ||
                notifications.length === 0 ||
                readAllMutation.isPending
              }
            >
              {readAllMutation.isPending ? "در حال خواندن..." : "خواندن همه"}
            </Button>
          </Stack>

          <Divider
            sx={{
              borderColor: "border.secondary",
            }}
          />

          {/* Notification List */}
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isPending ? (
              <NotificationListSkeleton />
            ) : isError ? (
              <NotificationEmptyState>
                دریافت اعلان‌ها با خطا مواجه شد.
              </NotificationEmptyState>
            ) : notifications.length === 0 ? (
              <NotificationEmptyState>
                اعلان جدیدی وجود ندارد.
              </NotificationEmptyState>
            ) : (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))
            )}
          </Stack>

          <Divider
            sx={{
              borderColor: "border.secondary",
            }}
          />

          {/* View All */}
          <Box sx={{ p: 1 }}>
            <NextLink href={ROUTES.PROFILE.NOTIFICATIONS}>
              <Button fullWidth variant="text">
                مشاهده همه اعلان‌ها
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Popover>
    </>
  );
}

//#region // * ------------ Loading ------------
function NotificationListSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            px: 2,
            py: 1.5,
          }}
        >
          <Stack direction="row" sx={{ gap: 1.5, alignItems: "flex-start" }}>
            <Skeleton variant="circular" width={32} height={32} />

            <Stack
              sx={{
                flex: 1,
                gap: 0.5,
              }}
            >
              <Skeleton variant="text" width="45%" height={20} />

              <Skeleton variant="text" width="90%" height={18} />

              <Skeleton variant="text" width="30%" height={16} />
            </Stack>
          </Stack>
        </Box>
      ))}
    </>
  );
}
//#endregion

//#region // * ------------ Empty State ------------
interface NotificationEmptyStateProps {
  children: React.ReactNode;
}

function NotificationEmptyState({ children }: NotificationEmptyStateProps) {
  return (
    <Box
      sx={{
        minHeight: 180,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Typography
        variant="body3"
        sx={{
          color: "text.secondary",
          textAlign: "center",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
//#endregion
