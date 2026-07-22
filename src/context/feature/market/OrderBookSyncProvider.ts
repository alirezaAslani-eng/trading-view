"use client";
import { useEffect } from "react";
import { OrderBookResponse } from "@/api/types";
import { orderBookKey, queryClient } from "@/packages/react-query";
import { orderBookUpdated, OrderBookUpdatedInfo } from "@/packages/signalr";
import { marketHub } from "@/packages/signalr/hubs";

function updateOrderBookCache(order: OrderBookUpdatedInfo) {
  // marketHub.onTickLog({ source: "Order Book", event: orderBookUpdated });

  queryClient.setQueriesData(
    { queryKey: orderBookKey },
    (
      cachedOrder: OrderBookResponse | undefined
    ): OrderBookResponse | undefined => {
      if (!cachedOrder) return cachedOrder;
      if (cachedOrder.symbol !== order.s) return cachedOrder;
      return {
        bids: order.b,
        asks: order.a,
        symbol: order.s,
      };
    }
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
