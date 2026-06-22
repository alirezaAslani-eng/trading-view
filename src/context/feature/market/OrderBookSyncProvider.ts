"use client";
import { useEffect } from "react";
import { OrderBookResponse } from "@/api/types";
import { orderBookKey, queryClient } from "@/packages/react-query";
import {
  getConnection,
  orderBookUpdated,
  OrderBookUpdatedInfo,
} from "@/packages/signalr";

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

function useSyncOrderBookQueries() {
  useEffect(() => {
    const con = getConnection()!;

    con.on(orderBookUpdated, updateOrderBookCache);

    return () => {
      con.off(orderBookUpdated, updateOrderBookCache);
    };
  }, []);
}

function OrderBookSyncProvider() {
  useSyncOrderBookQueries();
  return null;
}

export default OrderBookSyncProvider;
