"use client";

import { getMarketTickers } from "@/api";
import type { MarketTicker, MarketTickersResponse } from "@/api/types";
import { marketTickersKey } from "@/packages/react-query";
import { getConnection, start } from "@/packages/signalr";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type PropsWithChildren,
} from "react";

type ProductTableRow = {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number;
  change7d: number;
  change30d: number;
  volume24h: number;
};

type ProductsTableContextValue = {
  rows: ProductTableRow[];
  isLoading: boolean;
  isError: boolean;
};

const ProductsTableContext = createContext<ProductsTableContextValue | null>(null);
const marketEvents = [
  "TickerUpdated",
  "TickersUpdated",
  "MarketTickerUpdated",
  "MarketTickersUpdated",
  "ReceiveTickerUpdate",
  "ReceiveTickerUpdates",
] as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim().length) return Number(value);
  return 0;
}

function normalizeTickerPayload(payload: unknown): MarketTicker | null {
  if (!isObject(payload)) return null;

  const symbol = payload.symbol ?? payload.Symbol;
  const name = payload.name ?? payload.Name;

  if (typeof symbol !== "string" || typeof name !== "string") return null;

  return {
    symbol,
    name,
    lastPrice: asNumber(payload.lastPrice ?? payload.LastPrice),
    change24h: asNumber(payload.change24h ?? payload.Change24h),
    change7d: asNumber(payload.change7d ?? payload.Change7d),
    change30d: asNumber(payload.change30d ?? payload.Change30d),
    volume24h: asNumber(payload.volume24h ?? payload.Volume24h),
  };
}

function extractTickerPayload(payload: unknown): MarketTicker[] {
  if (Array.isArray(payload)) {
    return payload.map(normalizeTickerPayload).filter((item) => !!item);
  }

  const singleTicker = normalizeTickerPayload(payload);
  if (singleTicker) return [singleTicker];

  if (!isObject(payload)) return [];

  const nestedPayload =
    payload.data ?? payload.Data ?? payload.items ?? payload.Items;
  if (!Array.isArray(nestedPayload)) return [];

  return nestedPayload.map(normalizeTickerPayload).filter((item) => !!item);
}

function upsertTickers(
  previousTickers: MarketTickersResponse,
  nextTickers: MarketTicker[],
): MarketTickersResponse {
  if (!nextTickers.length) return previousTickers;

  const tickersBySymbol = new Map(
    previousTickers.map((ticker) => [ticker.symbol.toLocaleUpperCase(), ticker]),
  );

  nextTickers.forEach((ticker) => {
    tickersBySymbol.set(ticker.symbol.toLocaleUpperCase(), ticker);
  });

  return Array.from(tickersBySymbol.values());
}

function mapTickerToRow(ticker: MarketTicker): ProductTableRow {
  return {
    id: ticker.symbol,
    symbol: ticker.symbol,
    name: ticker.name,
    currentPrice: ticker.lastPrice,
    change24h: ticker.change24h,
    change7d: ticker.change7d,
    change30d: ticker.change30d,
    volume24h: ticker.volume24h,
  };
}

function ProductsTableProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();

  const tickersQuery = useQuery({
    queryKey: marketTickersKey,
    queryFn: getMarketTickers,
  });

  useEffect(() => {
    const conn = getConnection();
    if (!conn) return;

    const updateRows = (payload: unknown) => {
      const nextTickers = extractTickerPayload(payload);
      if (!nextTickers.length) return;

      queryClient.setQueryData<MarketTickersResponse>(
        marketTickersKey,
        (previousTickers = []) => {
          return upsertTickers(previousTickers, nextTickers);
        },
      );
    };

    marketEvents.forEach((eventName) => conn.on(eventName, updateRows));

    start(conn);

    return () => {
      marketEvents.forEach((eventName) => conn.off(eventName, updateRows));
    };
  }, [queryClient]);

  const rows = useMemo(() => {
    return (tickersQuery.data ?? []).map(mapTickerToRow);
  }, [tickersQuery.data]);

  const value = useMemo(
    () => ({
      rows,
      isLoading: tickersQuery.isLoading,
      isError: tickersQuery.isError,
    }),
    [rows, tickersQuery.isLoading, tickersQuery.isError],
  );

  return (
    <ProductsTableContext.Provider value={value}>
      {children}
    </ProductsTableContext.Provider>
  );
}

function useProductsTable() {
  const ctx = useContext(ProductsTableContext);
  if (!ctx) {
    throw new Error("useProductsTable must be used inside ProductsTableProvider");
  }

  return ctx;
}

export { ProductsTableProvider, useProductsTable, type ProductTableRow };
