"use client";
import { useEffect } from "react";
import { MarketTickerInfoResponse } from "@/api/types";
import { marketTickerInfoKey, queryClient } from "@/packages/react-query";
import {
  getConnection,
  onTradeExecuted,
  OnTradeExecutedInfo,
} from "@/packages/signalr";

function updateTckerInfoCache(trade: OnTradeExecutedInfo) {
  queryClient.setQueriesData(
    { queryKey: marketTickerInfoKey },
    (
      tickerInfo: MarketTickerInfoResponse | undefined,
    ): MarketTickerInfoResponse | undefined => {
      if (!tickerInfo) return tickerInfo;

      if (tickerInfo.symbol !== trade.productCode) return tickerInfo;
      console.log({
        ...tickerInfo,
        lastPrice: trade.price,
      });

      return {
        ...tickerInfo,
        lastPrice: trade.price,
      };
    },
  );
}

function useSyncTickerInfoQueries() {
  useEffect(() => {
    const con = getConnection()!;

    con.on(onTradeExecuted, updateTckerInfoCache);

    return () => {
      con.off(onTradeExecuted, updateTckerInfoCache);
    };
  }, []);
}

function TickerInfoSyncProvider() {
  useSyncTickerInfoQueries();
  return null;
}

export default TickerInfoSyncProvider;
