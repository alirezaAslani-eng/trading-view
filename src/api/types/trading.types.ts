// * --start-- candlestickHistory.ts -----------
interface CandleDataType extends Record<
  "t" | "o" | "h" | "l" | "c" | "v",
  number
> {
  s: string;
}

type CandlestickHistoryQueryKeys = "symbol" | "resolution" | "from" | "to";

type CandlestickHistoryQueries = Record<CandlestickHistoryQueryKeys, string>;

type CandlestickHistoryResponse = CandleDataType[];
// * --end-- candlestickHistory.ts -----------

// * --start-- tradingViewConfig.ts -----------
interface TradingViewConfigResponse {
  supported_resolutions: string[];
  supports_group_request: boolean;
  supports_marks: boolean;
  supports_search: boolean;
  supports_timescale_marks: boolean;
}
// * --end-- tradingViewConfig.ts -----------

export type {
  CandleDataType,
  CandlestickHistoryResponse,
  CandlestickHistoryQueries,
  TradingViewConfigResponse,
};
