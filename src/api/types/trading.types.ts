import { LibrarySymbolInfo } from "@/packages/tradingview";

// * --start-- candlestickHistory.ts ----------
type CandleDataType = Partial<{
  s: string;
  t: number[];
  o: number[];
  h: number[];
  l: number[];
  c: number[];
  v: number[];
}>;

type CandlestickHistoryQueryKeys = "symbol" | "resolution" | "from" | "to";

type CandlestickHistoryQueries = Record<CandlestickHistoryQueryKeys, string>;

type CandlestickHistoryResponse = CandleDataType;
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
type SymbolDetailsResponse = Symbol;
// * --end--symbolDetails.ts----

// * --start--symbols.ts----
type SymbolsResponse = Symbol[];
// * --end--symbols.ts----

// * --start--searchSymbols.ts----
type SearchSymbolsResponse = SearchedSymbol[];
// * --end--searchSymbols.ts----

export type {
  CandleDataType,
  CandlestickHistoryResponse,
  CandlestickHistoryQueries,
  TradingViewConfigResponse,
  SymbolDetailsResponse,
  SymbolsResponse,
  SearchSymbolsResponse,
};

type Symbol = Pick<
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

type SearchedSymbol = Pick<
  LibrarySymbolInfo,
  "description" | "type" | "exchange" | "full_name"
> & { symbol: string };
