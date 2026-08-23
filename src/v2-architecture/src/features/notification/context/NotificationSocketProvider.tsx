"use client";
import { notificationHub, OnReceiveNotification } from "@/packages/signalr";
import { useEffect } from "react";
import { playNotificationSound } from "../helpers";
import { queryClient } from "@/packages/react-query";
import { notificationsKey } from "../react-query/keys";
import { signalRLog } from "@/packages/signalr/helpers";
import { customAlert } from "@/packages/react-hot-toast";
import { NotificationToast } from "../component";
import { NotificationSocketPayload } from "../types";

const updateNotifications = async (payload: NotificationSocketPayload) => {
  await queryClient.cancelQueries({ queryKey: notificationsKey });
  queryClient.invalidateQueries({ queryKey: notificationsKey }).then(() => {
    playNotificationSound();
    //#region // * ------------ Ui ------------
    customAlert(
      () => {
        return <NotificationToast notification={payload} />;
      },
      { position: "bottom-left" },
    );
    //#endregion
  });
};

function NotificationSocketProvider() {
  useEffect(() => {
    const con = notificationHub.build();
    notificationHub
      .start(con)
      .then(() => {
        signalRLog("notifications", "CONNECTION_STARTED");
      })
      .catch((err) => {
        signalRLog("notifications", "CONNECTION_FAILED", err);
      });
    con.on(OnReceiveNotification, updateNotifications);
    return () => {
      con.off(OnReceiveNotification, updateNotifications);
    };
  }, []);
  return null;
}

export default NotificationSocketProvider;
