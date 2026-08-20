"use client";

import { useEffect } from "react";

import { ordersKey, queryClient } from "@/packages/react-query";

import { onOrderUpdate } from "@/packages/signalr";

import { orderHub } from "@/packages/signalr/hubs";

import { signalRLog } from "@/packages/signalr/helpers";

async function updateOrdersCache() {
  await queryClient.cancelQueries({
    queryKey: ordersKey,
  });

  queryClient.invalidateQueries({
    queryKey: ordersKey,
  });

  signalRLog("orders", "CACHE_INVALIDATED", {
    listener: onOrderUpdate,
    target_cache: ordersKey,
  });
}

function OrdersSyncProvider() {
  useEffect(() => {
    const con = orderHub.build();

    orderHub.start(con).then(() => {
      signalRLog("orders", "CONNECTION_STARTED");
    });

    con.on(onOrderUpdate, updateOrdersCache);

    return () => {
      con.off(onOrderUpdate, updateOrdersCache);
    };
  }, []);

  return null;
}

export default OrdersSyncProvider;
