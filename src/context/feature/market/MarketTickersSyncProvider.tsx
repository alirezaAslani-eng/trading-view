"use client";

import { useEffect } from "react";

import type { MarketTickersResponse } from "@/api/types";

import { marketTickersKey, queryClient } from "@/packages/react-query";

import {
  marketHub,
  OnMarketPriceChanged,
  type OnMarketTickersUpdatedInfo,
} from "@/packages/signalr";

import { signalRLog } from "@/packages/signalr/helpers";

function updateMarketTickersQuery(data: OnMarketTickersUpdatedInfo) {
  signalRLog("market", "CACHE_UPDATED", {
    listener: OnMarketPriceChanged,
    payload: data,
    target_cache: marketTickersKey,
  });

  queryClient.setQueryData(
    marketTickersKey,
    (tickers: MarketTickersResponse | undefined) => {
      if (!tickers) return tickers;

      return tickers.map((ticker) => {
        if (ticker.symbol !== data.productCode) {
          return ticker;
        }

        return {
          ...ticker,
          lastPrice: data.price,
        };
      });
    },
  );
}

function MarketTickersSyncProvider() {
  useEffect(() => {
    const con = marketHub.build();

    con.on(OnMarketPriceChanged, updateMarketTickersQuery);

    return () => {
      con.off(OnMarketPriceChanged, updateMarketTickersQuery);
    };
  }, []);

  return null;
}

export default MarketTickersSyncProvider;
