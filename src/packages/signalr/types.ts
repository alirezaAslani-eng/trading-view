import { WalletPortfolioResponse } from "@/api/types";
import { OrderSide } from "@/types";

// * ========== Listener calback types ===========
type OnTradeExecutedInfo = Record<"price" | "volum" | "time", number> & {
  productCode: string;
  source: "Trade" | "Robot";
  isOrganic: boolean;
  side: OrderSide;
};
type OrderBookUpdatedPayload = {
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
  settlementMode: 0 | 1;
  isDemo: boolean;
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
  OrderBookUpdatedPayload,
  OnMarketTickersUpdatedInfo,
  OnPriceUpdateInfo,
  OnPortfolioUpdateInfo,
  OnMarketPriceChangedInfo,
};
