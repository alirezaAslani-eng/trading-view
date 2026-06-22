// * ========== Listener calback types ===========
type OnTradeExecutedInfo = Record<"price" | "volum" | "time", number> & {
  productCode: string;
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

export type { OnTradeExecutedInfo, OrderBookUpdatedInfo };
