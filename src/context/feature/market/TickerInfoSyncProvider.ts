"use client";

import { useEffect } from "react";

import type { MarketTickerInfoResponse } from "@/api/types";

import { marketTickerInfoKey, queryClient } from "@/packages/react-query";

import {
  marketHub,
  OnMarketPriceChanged,
  onTradeExecuted,
  type OnMarketPriceChangedInfo,
  type OnTradeExecutedInfo,
} from "@/packages/signalr";

function updateByMarketPrice(data: OnMarketPriceChangedInfo) {
  queryClient.setQueriesData(
    { queryKey: marketTickerInfoKey },
    (tickerInfo: MarketTickerInfoResponse | undefined) => {
      if (!tickerInfo) return tickerInfo;

      if (tickerInfo.symbol !== data.symbol) return tickerInfo;

      return {
        ...tickerInfo,
        lastPrice: data.price,
      };
    },
  );
}

function updateByTrade(data: OnTradeExecutedInfo) {
  queryClient.setQueriesData(
    { queryKey: marketTickerInfoKey },
    (tickerInfo: MarketTickerInfoResponse | undefined) => {
      if (!tickerInfo) return tickerInfo;

      if (tickerInfo.symbol !== data.productCode) return tickerInfo;

      return {
        ...tickerInfo,
        volum: data.volum,
      };
    },
  );
}

function TickerInfoSyncProvider() {
  useEffect(() => {
    const con = marketHub.build();

    con.on(OnMarketPriceChanged, updateByMarketPrice);
    con.on(onTradeExecuted, updateByTrade);

    return () => {
      con.off(OnMarketPriceChanged, updateByMarketPrice);
      con.off(onTradeExecuted, updateByTrade);
    };
  }, []);

  return null;
}

export default TickerInfoSyncProvider;
