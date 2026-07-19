"use client";
import { useEffect } from "react";
import { OrderBookResponse } from "@/api/types";
import { orderBookKey, queryClient } from "@/packages/react-query";
import { orderBookUpdated, OrderBookUpdatedInfo } from "@/packages/signalr";
import { orderHub } from "@/packages/signalr/hubs";

function updateOrderBookCache(order: OrderBookUpdatedInfo) {
  queryClient.setQueriesData(
    { queryKey: orderBookKey },
    (
      cachedOrder: OrderBookResponse | undefined,
    ): OrderBookResponse | undefined => {
      if (!cachedOrder) return cachedOrder;
      if (cachedOrder.symbol !== order.s) return cachedOrder;
      return {
        bids: order.b,
        asks: order.a,
        symbol: order.s,
      };
    },
  );
}

function OrderBookSyncProvider() {
  useEffect(() => {
    const con = orderHub.build();

    con.on(orderBookUpdated, updateOrderBookCache);

    return () => {
      con.off(orderBookUpdated, updateOrderBookCache);
    };
  }, []);
  return null;
}

export default OrderBookSyncProvider;
