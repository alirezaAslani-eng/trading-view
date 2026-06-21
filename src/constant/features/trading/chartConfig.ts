"use client";
import { candlestickHistory, searchSymbols, tradingViewConfig } from "@/api";
import symbolDetails from "@/api/trading/symbolDetails";
import { Bar, ResolutionString, WidgetOptions } from "@/packages/tradingview";
import safeAsync from "@/utils/app/safeAsync";
import {
  getConnection,
  onTradeExecuted,
  OnTradeExecutedInfo,
  start,
  subscribeToMarket,
} from "@/packages/signalr";
import { CandleDataType } from "@/api/types";

//@ts-ignore
const datafeed: WidgetOptions["datafeed"] = {
  onReady: async (cb) => {
    const config = await safeAsync(() => tradingViewConfig());
    if (!config.ok) return;

    // @ts-ignore
    cb({
      ...config.data,
      symbols_types: [{ name: "All", value: "all" }],
    });
  },

  resolveSymbol: async (symbolName, onResolve, onError) => {
    const symbolInfo = await safeAsync(() => symbolDetails(symbolName));

    if (!symbolInfo.ok) {
      console.log("Faild to find symbol", symbolInfo.error);
      onError("Faild to find symbol");
      return;
    }

    onResolve({
      ...symbolInfo.data,
      format: "price",
      full_name: symbolInfo.data.description,
      has_intraday: true,
    });
  },

  getBars: async (symbolInfo, resolution, periodParams, onResult, onError) => {
    const candleHistory = await safeAsync(() =>
      candlestickHistory({
        queries: {
          from: String(periodParams.from),
          to: String(periodParams.to),
          resolution,
          symbol: symbolInfo.name,
        },
      }),
    );

    if (!candleHistory.ok) {
      const errMessage = "Faild to load candle history data";
      console.log(errMessage, candleHistory.error);
      onError(errMessage);
      return;
    }
    const candles = normalizeCandles(candleHistory.data);

    onResult(candles, {
      noData: candles.length === 0,
    });
  },

  searchSymbols: async (query, _, __, onResult) => {
    const searchResult = await safeAsync(() => searchSymbols(query));
    if (!searchResult.ok) {
      onResult([]);
      console.log("search symbol error :", searchResult.error);
      return;
    }
    onResult(
      searchResult.data.map((item) => {
        return { ...item, ticker: item.symbol };
      }),
    );
  },

  subscribeBars: (symbolInfo, _, onTick) => {
    const con = getConnection()!;
    const startConection = async () => {
      await start(con);
      con.invoke(subscribeToMarket, symbolInfo.name);
    };
    startConection();
    const handler = (trade: OnTradeExecutedInfo) => {
      onTick({
        volume: trade.volum,
        time: trade.time * 1000,
        close: trade.price,
        high: trade.price,
        low: trade.price,
        open: trade.price,
      });
    };
    con.on(onTradeExecuted, handler);

    (window as any)._con_ = con;
    (window as any)._handler_ = handler;
  },
  unsubscribeBars: () => {
    const con = (window as any)._con_;
    const handler = (window as any)._handler_;

    if (!con) return;
    con.off(onTradeExecuted, handler);
  },
};

const widgetOptions = {
  datafeed,

  library_path: "/charting_library/",

  interval: "1" as ResolutionString,

  locale: "fa",

  timezone: "Asia/Tehran",

  autosize: true,

  debug: true,
} satisfies Partial<WidgetOptions>;

export { datafeed, widgetOptions };

function normalizeCandles(candleData: CandleDataType): Bar[] {
  if (!!!candleData?.s) return [];
  const candleCounts = candleData.t!.length;

  const candles: Bar[] = Array.from({ length: candleCounts }, (_, index) => {
    return {
      time: candleData.t![index] * 1000,
      close: candleData.c![index],
      open: candleData.o![index],
      high: candleData.h![index],
      low: candleData.l![index],
      volume: candleData.v![index],
    };
  });
  return candles;
}
