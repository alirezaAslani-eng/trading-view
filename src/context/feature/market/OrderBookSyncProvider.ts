"use client";

import { OrderBookData } from "@/api";
import {
  marketHub,
  orderBookUpdated,
  OrderBookUpdatedInfo,
} from "@/packages/signalr";
import { useEffect, useEffectEvent } from "react";
import { orderBookDynamicKey, queryClient } from "@/packages/react-query";
import { useMarketSubscribe } from "@/context/feature/market/MarketSubscribeProvider";
import useSymbolParams from "@/hooks/features/trading/useSymbolParams";
import { useSettlementMode } from "@/v2-architecture/src/features/trading";
import { useTradeMode } from "../trade/TradeMode";

export function OrderBookSyncProvider() {
  const [symbol] = useSymbolParams(); // ! Depends on /trade/[symbol] page
  const { shouldListenerStop } = useMarketSubscribe()!;
  const { isDemo } = useTradeMode();
  const { settlementMode } = useSettlementMode()!;
  const updateOrderBookCache = useEffectEvent((order: OrderBookUpdatedInfo) => {
    if (shouldListenerStop) return;

    queryClient.setQueryData(
      orderBookDynamicKey({ symbol, settlementMode, isdemo: isDemo }),
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
  });

  useEffect(() => {
    const con = marketHub.build();

    con.on(orderBookUpdated, updateOrderBookCache);

    return () => {
      con.off(orderBookUpdated, updateOrderBookCache);
    };
  }, []);

  return null;
}
