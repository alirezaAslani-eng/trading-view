"use client";
import { OrderBookData } from "@/api";
import { useEffect, useEffectEvent } from "react";
import { orderBookDynamicKey, queryClient } from "@/packages/react-query";
import {
  marketHub,
  orderBookUpdated,
  OrderBookUpdatedPayload,
} from "@/packages/signalr";

export function OrderBookSyncProvider({ symbol }: { symbol: string }) {
  const updateOrderBookCache = useEffectEvent(
    (order: OrderBookUpdatedPayload) => {
      const { isDemo, settlementMode } = order;
      const queryKey = orderBookDynamicKey({
        symbol,
        settlementMode: !!settlementMode,
        isdemo: isDemo,
      });

      // signalRLog("market", "CACHE_UPDATED", {
      //   listener: orderBookUpdated,
      //   payload: order,
      //   key: queryKey,
      // });

      queryClient.setQueryData(
        queryKey,
        (cachedOrder: OrderBookData | undefined): OrderBookData | undefined => {
          if (!cachedOrder) return cachedOrder;

          if (cachedOrder.symbol !== order.s) {
            return cachedOrder;
          }

          return {
            bids: order.b,
            asks: order.a,
            symbol: order.s,
          };
        },
      );
    },
  );

  useEffect(() => {
    const con = marketHub.build();

    con.on(orderBookUpdated, updateOrderBookCache);

    return () => {
      con.off(orderBookUpdated, updateOrderBookCache);
    };
  }, []);

  return null;
}
