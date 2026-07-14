import { WalletPortfolioResponse } from "@/api/types";
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
type OnPortfolioUpdateInfo = WalletPortfolioResponse;
type OnPriceUpdateInfo = {
  symbol: string;
  newPrice: number;
  price24h: number;
}; 
type OnMarketPriceChangedInfo = {
  symbol: string;
  price: number;
};
export type {
  OnTradeExecutedInfo,
  OrderBookUpdatedInfo,
  OnMarketTickersUpdatedInfo,
  OnPriceUpdateInfo,
  OnPortfolioUpdateInfo,
 OnMarketPriceChangedInfo
};
