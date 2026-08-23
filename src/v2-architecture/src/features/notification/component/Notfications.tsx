"use client";
import { useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import Button from "@/components/ui/Button/Button";
import {
  notificationsInfiniteConfig,
  readAllNotificationsConfig,
} from "@/v2-architecture/src/features/notification/react-query";
import NotificationCard from "./NotificationCard";

export default function Notifications() {
  //#region // * ------------ Notifications API ------------
  const notificationsQuery = useInfiniteQuery(notificationsInfiniteConfig(10));

  const { unreadCount = 0, items: notifications = [] } =
    notificationsQuery.data ?? {};

  const { isPending, isError, isFetchingNextPage, hasNextPage } =
    notificationsQuery;
  //#endregion

  //#region // * ------------ Read All API ------------
  const readAllMutation = useMutation(readAllNotificationsConfig());

  const handleReadAll = () => {
    readAllMutation.mutate();
  };
  //#endregion

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* Header */}

      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 2,
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
          disabled={isPending || unreadCount === 0 || readAllMutation.isPending}
        >
          {readAllMutation.isPending ? "در حال خواندن..." : "خواندن همه"}
        </Button>
      </Stack>

      <Divider
        sx={{
          borderColor: "border.secondary",
        }}
      />

      {/* Initial Loading */}

      {isPending && <NotificationListSkeleton />}

      {/* Error */}

      {!isPending && isError && (
        <NotificationEmptyState>
          دریافت اعلان‌ها با خطا مواجه شد.
        </NotificationEmptyState>
      )}

      {/* Empty */}

      {!isPending && !isError && notifications.length === 0 && (
        <NotificationEmptyState>اعلان جدیدی وجود ندارد.</NotificationEmptyState>
      )}

      {/* Notifications */}

      {!isPending && !isError && notifications.length > 0 && (
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}

          {/* Load More */}

          {hasNextPage && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                px: 2,
                py: 2,
              }}
            >
              <Button
                variant="on-surface"
                size="small"
                disabled={isFetchingNextPage}
                onClick={() => notificationsQuery.fetchNextPage()}
              >
                {isFetchingNextPage
                  ? "در حال دریافت..."
                  : "نمایش اعلان‌های بیشتر"}
              </Button>
            </Box>
          )}
        </Stack>
      )}

      {/* Fetching Next Page Skeleton */}

      {isFetchingNextPage && <NotificationListSkeleton count={2} />}
    </Box>
  );
}

//#endregion

//#region // * ------------ Loading ------------

interface NotificationListSkeletonProps {
  count?: number;
}

function NotificationListSkeleton({
  count = 5,
}: NotificationListSkeletonProps) {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          sx={{
            px: 2,
            py: 1.5,
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
            <Skeleton
              variant="circular"
              sx={{
                width: 32,
                height: 32,
              }}
            />

            <Stack
              sx={{
                flex: 1,
                gap: 0.5,
              }}
            >
              <Skeleton
                variant="text"
                sx={{
                  width: "35%",
                  height: 20,
                }}
              />

              <Skeleton
                variant="text"
                sx={{
                  width: "85%",
                  height: 18,
                }}
              />

              <Skeleton
                variant="text"
                sx={{
                  width: "25%",
                  height: 16,
                }}
              />
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

//#endregion

//#region // * ------------ Empty / Error ------------

interface NotificationEmptyStateProps {
  children: React.ReactNode;
}

function NotificationEmptyState({ children }: NotificationEmptyStateProps) {
  return (
    <Box
      sx={{
        minHeight: 240,
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
