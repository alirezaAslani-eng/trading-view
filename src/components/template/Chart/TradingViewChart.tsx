"use client";

import React, { RefObject, useEffect, useRef } from "react";
import {
  widget,
  ChartingLibraryWidgetOptions,
  TradingTerminalWidgetOptions,
  ResolutionString,
  SearchSymbolResultItem,
  IChartingLibraryWidget,
} from "@/packages/tradingview";

type WidgetOptions =
  | ChartingLibraryWidgetOptions
  | TradingTerminalWidgetOptions;

type SymbolRegistryItem = SearchSymbolResultItem & {
  pricescale: number;
};

type Bar = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

const fakeDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const SUPPORTED_RESOLUTIONS = ["1", "60"] as ResolutionString[];

/* =========================
   SYMBOLS
========================= */

const symbols: SymbolRegistryItem[] = [
  {
    symbol: "BTCUSDT",
    ticker: "BTCUSDT",
    full_name: "Bitcoin / Tether",
    description: "Bitcoin",
    exchange: "Binance",
    type: "crypto",
    pricescale: 100,
  },

  {
    symbol: "ETHUSDT",
    ticker: "ETHUSDT",
    full_name: "Ethereum / Tether",
    description: "Ethereum",
    exchange: "Binance",
    type: "crypto",
    pricescale: 100,
  },

  {
    symbol: "AAPL",
    ticker: "AAPL",
    full_name: "Apple Inc.",
    description: "Apple Inc.",
    exchange: "NASDAQ",
    type: "stock",
    pricescale: 100,
  },
];

/* =========================
   BARS
========================= */

const bars: Bar[] = [
  {
    time: Date.now() - 5 * 60 * 1000,
    open: 100,
    high: 110,
    low: 95,
    close: 105,
    volume: 10,
  },
  {
    time: Date.now() - 4 * 60 * 1000,
    open: 105,
    high: 112,
    low: 101,
    close: 108,
    volume: 12,
  },
  {
    time: Date.now() - 3 * 60 * 1000,
    open: 108,
    high: 115,
    low: 107,
    close: 111,
    volume: 8,
  },
  {
    time: Date.now() - 2 * 60 * 1000,
    open: 80,
    high: 115,
    low: 70,
    close: 95,
    volume: 9,
  },
  {
    time: Date.now() - 1 * 60 * 1000,
    open: 95,
    high: 120,
    low: 90,
    close: 110,
    volume: 11,
  },
];

/* =========================
   DATAFEED
========================= */

const datafeed: WidgetOptions["datafeed"] = {
  onReady: (cb) => {
    setTimeout(() => {
      cb({
        supported_resolutions: SUPPORTED_RESOLUTIONS,
        supports_marks: false,
        supports_time: true,
        supports_timescale_marks: false,
        symbols_types: [{ name: "All", value: "all" }],
      });
    }, 0);
  },

  searchSymbols: async (userInput, exchange, symbolType, onResult) => {
    await fakeDelay(200);

    const q = userInput.toLowerCase();

    const result = symbols.filter(
      (symbol) =>
        symbol.symbol.toLowerCase().includes(q) ||
        symbol.description.toLowerCase().includes(q) ||
        symbol.full_name.toLowerCase().includes(q),
    );

    onResult(result);
  },

  resolveSymbol: async (symbolName, onResolve, onError) => {
    await fakeDelay(150);

    const found = symbols.find((symbol) => symbol.symbol === symbolName);

    if (!found) {
      onError("Symbol not found");
      return;
    }

    onResolve({
      name: found.symbol,
      ticker: found.ticker,

      full_name: found.full_name,
      description: found.description,
      exchange: found.exchange,
      type: found.type,

      session: "24x7",
      timezone: "Etc/UTC",

      minmov: 1,
      pricescale: found.pricescale,

      has_intraday: true,
      has_daily: true,

      supported_resolutions: SUPPORTED_RESOLUTIONS,

      volume_precision: 2,
      data_status: "streaming",
      format: "price",
      listed_exchange: found.symbol,
    });
  },

  getBars: async (symbolInfo, resolution, periodParams, onResult, onError) => {
    await fakeDelay(300);

    const data = bars
      .filter(
        (bar) =>
          bar.time >= periodParams.from * 1000 &&
          bar.time <= periodParams.to * 1000,
      )
      .sort((a, b) => a.time - b.time);

    onResult(data, {
      noData: data.length === 0,
    });
  },

  subscribeBars: (symbolInfo, resolution, onRealtimeCallback) => {
    const id = window.setInterval(() => {
      const last = bars[bars.length - 1];

      const newBar: Bar = {
        time: Date.now(),
        open: last.close,
        high: last.close + Math.random() * 5,
        low: last.close - Math.random() * 5,
        close: last.close + (Math.random() - 0.5) * 8,
        volume: Math.floor(Math.random() * 10),
      };

      onRealtimeCallback(newBar);
    }, 2000);

    (window as any).__tv_sub = id;
  },

  unsubscribeBars: () => {
    clearInterval((window as any).__tv_sub);
  },
};

/* =========================
   CHART
========================= */

const initialOptions: Omit<WidgetOptions, "container"> = {
  datafeed,

  symbol: "ETHUSDT", // * dynamic field

  interval: "1" as ResolutionString,

  library_path: "/charting_library/",

  autosize: true,

  theme: "Light", // * dynamic field

  locale: "fa",

  timezone: "Asia/Tehran",

  symbol_search_request_delay: 500,

  enabled_features: ["header_symbol_search"],
};

/* =========================
   TV WRAPPER
========================= */

function TradingViewChart(props: {
  widgetOptions: Omit<WidgetOptions, "container">;
  widgetRef?: RefObject<IChartingLibraryWidget | null>;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const widgetInstance = new widget({
      ...props.widgetOptions,
      container: containerRef.current,
    });

    if (!!props?.widgetRef) props.widgetRef.current = widgetInstance;

    return () => {
      widgetInstance.remove();
      if (!!props?.widgetRef) props.widgetRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}

export default Usage;

function Usage() {
  const ref = useRef<IChartingLibraryWidget>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.onChartReady(() => {
      ref.current
        ?.activeChart()
        .onSymbolChanged()
        //@ts-ignore
        .subscribe(null, (symbolInfo) => {
          console.log(symbolInfo);
        });
      ref.current;
    });
  }, []);
  return <TradingViewChart widgetOptions={initialOptions} widgetRef={ref} />;
}
