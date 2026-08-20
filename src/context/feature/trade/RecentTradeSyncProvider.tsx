"use client";
import { useEffect } from "react";
import { queryClient, recentTradesDynamicKey } from "@/packages/react-query";
import type { RecentTrade, RecentTradeResponse } from "@/api/types";
import { signalRLog } from "@/packages/signalr/helpers";
import {
  marketHub,
  onTradeExecuted,
  type OnTradeExecutedInfo,
} from "@/packages/signalr";

function updateRecentTrade(payload: OnTradeExecutedInfo) {
  signalRLog("market", "CACHE_UPDATED", {
    listener: onTradeExecuted,
    payload,
    target_cache: recentTradesDynamicKey(payload.productCode),
  });

  if (!payload.isOrganic) return;

  queryClient.setQueryData<RecentTradeResponse>(
    recentTradesDynamicKey(payload.productCode),
    (oldData) => {
      if (!oldData) return oldData;

      const newTrade: RecentTrade = {
        price: payload.price,
        source: payload.source,
        createdAt: new Date(payload.time * 1000).toISOString(),
        isOrganic: payload.isOrganic,
        side: payload.side,
      };

      return [newTrade, ...oldData].slice(0, 50);
    },
  );
}

function RecentTradeSyncProvider() {
  useEffect(() => {
    const con = marketHub.build();

    con.on(onTradeExecuted, updateRecentTrade);

    return () => {
      con.off(onTradeExecuted, updateRecentTrade);
    };
  }, []);

  return null;
}

export default RecentTradeSyncProvider;
