"use client";
import { useEffect } from "react";

import { orderBookKey, queryClient } from "@/packages/react-query";
import { orderBookUpdated, OrderBookUpdatedInfo } from "@/packages/signalr";
import { marketHub } from "@/packages/signalr/hubs";
import { OrderBookData } from "@/api";

function updateOrderBookCache(order: OrderBookUpdatedInfo) {
  // marketHub.onTickLog({ source: "Order Book", event: orderBookUpdated });

  queryClient.setQueriesData(
    { queryKey: orderBookKey },
    (cachedOrder: OrderBookData | undefined): OrderBookData | undefined => {
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
    const con = marketHub.build();

    con.on(orderBookUpdated, updateOrderBookCache);

    return () => {
      con.off(orderBookUpdated, updateOrderBookCache);
    };
  }, []);
  return null;
}

export default OrderBookSyncProvider;
