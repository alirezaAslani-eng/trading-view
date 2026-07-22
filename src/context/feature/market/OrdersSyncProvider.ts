"use client";
import { useEffect } from "react";
import { orderHub } from "@/packages/signalr/hubs";
import { onOrderUpdate } from "@/packages/signalr";
import { ordersKey, queryClient } from "@/packages/react-query";

async function updateOrderBookCache() {
  orderHub.onTickLog({ event: onOrderUpdate, source: "Orders" });
  await queryClient.cancelQueries({ queryKey: ordersKey });
  queryClient.invalidateQueries({ queryKey: ordersKey });
}

function OrdersSyncProvider() {
  useEffect(() => {
    const con = orderHub.build();

    orderHub.start(con);

    con.on(onOrderUpdate, updateOrderBookCache);

    return () => {
      con.off(onOrderUpdate, updateOrderBookCache);
    };
  }, []);
  return null;
}

export default OrdersSyncProvider;
