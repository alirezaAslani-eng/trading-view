"use client";

import { useEffect } from "react";
import { marketTickersKey, queryClient } from "@/packages/react-query";
import type { MarketTickersResponse } from "@/api/types";
import {
  OnMarketTickersUpdatedInfo,
  OnMarketPriceChanged,
  marketHub,
} from "@/packages/signalr";

function updateMarketTickersQuery(data: OnMarketTickersUpdatedInfo) {
  console.log("SIGNALR -> Ticked Products", data);

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
    }
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
