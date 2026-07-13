import { MarketTicker } from "@/api/types/market.types";

// * ========== Listener calback types ===========
type OnTradeExecutedInfo = Record<"price" | "volum" | "time", number> & {
  productCode: string;
  source: "Trade" | "Robot";
  isOrganic: boolean;
};
type OrderBookUpdatedInfo = {
  /**
   * symbol
   */
  s: string;
  /**
   * asks
   */
  a: [];
  /**
   * bids
   */
  b: [];
};
type OnMarketTickersUpdatedInfo = OnTradeExecutedInfo;

export type {
  OnTradeExecutedInfo,
  OrderBookUpdatedInfo,
  OnMarketTickersUpdatedInfo,
};
