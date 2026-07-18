import { TradeModeStore } from "@/context/feature/trade/TradeMode/helpers";

export function buildTradeModeQueries() {
  const isDemo = TradeModeStore.getTradeModeConfig().isDemo;
  return {
    ...(isDemo && { isDemo: "true" }),
  };
}
