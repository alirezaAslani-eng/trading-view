import { LibrarySymbolInfo } from "@/packages/tradingview";

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

// * --start--symbolDetails.ts----

type SymbolDetailsResponse = Pick<
  LibrarySymbolInfo,
  | "name"
  | "ticker"
  | "description"
  | "type"
  | "session"
  | "exchange"
  | "listed_exchange"
  | "timezone"
  | "minmov"
  | "pricescale"
  | "has_intraday"
  | "supported_resolutions"
>;
// * --end--symbolDetails.ts----

// * --start--symbols.ts----
type SymbolsResponse = SymbolDetailsResponse[];
// * --end--symbols.ts----

export type {
  CandleDataType,
  CandlestickHistoryResponse,
  CandlestickHistoryQueries,
  TradingViewConfigResponse,
  SymbolDetailsResponse,
  SymbolsResponse,
};
