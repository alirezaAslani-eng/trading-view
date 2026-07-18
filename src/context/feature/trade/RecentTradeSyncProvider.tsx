"use client";

import { useEffect } from "react";

import {
  marketHub,
  onTradeExecuted,
  type OnTradeExecutedInfo,
} from "@/packages/signalr";

import { queryClient, recentTradesDynamicKey } from "@/packages/react-query";

import type { RecentTrade, RecentTradeResponse } from "@/api/types";

function updateRecentTrade(data: OnTradeExecutedInfo) {
  if (!data.isOrganic) return;

  queryClient.setQueryData<RecentTradeResponse>(
    recentTradesDynamicKey(data.productCode),
    (oldData) => {
      if (!oldData) return oldData;
      const newTrade: RecentTrade = {
        price: data.price,
        source: data.source,
        createdAt: new Date(data.time * 1000).toISOString(),
        isOrganic: data.isOrganic,
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
