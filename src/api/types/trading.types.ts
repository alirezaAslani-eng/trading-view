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

export type {
  CandleDataType,
  CandlestickHistoryResponse,
  CandlestickHistoryQueries,
};
