"use client";

import { getMarketTickers } from "@/api";
import type { MarketTicker } from "@/api/types";
import { marketTickersKey } from "@/packages/react-query";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type MarketMover = {
  symbol: string;
  asset: string;
  price: number;
  percentage: number;
  volume24h: number;
};

type MarketMovers = {
  mostProfit: MarketMover | null;
  mostLoss: MarketMover | null;
  mostTraded: MarketMover | null;
};

function toMover(ticker: MarketTicker): MarketMover {
  return {
    symbol: ticker.symbol,
    asset: ticker.name,
    price: ticker.lastPrice,
    percentage: ticker.change24h,
    volume24h: ticker.volume24h,
  };
}

function getMovers(tickers: MarketTicker[]): MarketMovers {
  if (!tickers.length) {
    return { mostProfit: null, mostLoss: null, mostTraded: null };
  }

  let mostProfit = tickers[0];
  let mostLoss = tickers[0];
  let mostTraded = tickers[0];

  tickers.forEach((ticker) => {
    if (ticker.change24h > mostProfit.change24h) mostProfit = ticker;
    if (ticker.change24h < mostLoss.change24h) mostLoss = ticker;
    if (ticker.volume24h > mostTraded.volume24h) mostTraded = ticker;
  });

  return {
    mostProfit: toMover(mostProfit),
    mostLoss: toMover(mostLoss),
    mostTraded: toMover(mostTraded),
  };
}

function useMarketMovers() {
  const tickersQuery = useQuery({
    queryKey: marketTickersKey,
    queryFn: getMarketTickers,
  });

  const movers = useMemo(
    () => getMovers(tickersQuery.data ?? []),
    [tickersQuery.data],
  );

  return {
    ...movers,
    isLoading: tickersQuery.isLoading,
    isError: tickersQuery.isError,
  };
}

export default useMarketMovers;
export type { MarketMover, MarketMovers };
