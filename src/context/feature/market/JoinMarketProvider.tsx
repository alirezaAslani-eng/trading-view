"use client";
import { useEffect } from "react";
import { useSettlementMode } from "@/v2-architecture/src/features/trading";
import { useTradeMode } from "@/context/feature/trade/TradeMode";
import { booleanToNumber } from "@/v2-architecture/src/shared/utils";
import {
  marketHub,
  subscribeToMarket,
  unSubscribeFromMarket,
} from "@/packages/signalr";
import {
  InvokeMarketConfig,
  useMarketInvoker,
} from "@/packages/signalr/invokers";

// * FUTURE: This Provider may be converted to a hook.
// * Values currently consumed internally (e.g. isDemo, settlementMode)
// * may be provided as explicit arguments in the future.

export function JoinMarketProvider({ symbol }: { symbol: string }) {
  //#region // * ------------ Needed state ------------
  const { isDemo } = useTradeMode()!;
  const { settlementMode } = useSettlementMode()!;
  //#endregion

  //#region // * ------------ Mutation ------------
  const marketInvoker = useMarketInvoker();
  //#endregion

  //#region // * ------------ Subscribe / Unsubscribe ------------
  useEffect(() => {
    if (!symbol) return;
    const con = marketHub.build();

    const config: InvokeMarketConfig = {
      con,
      event: subscribeToMarket,
      symbols: [symbol], // * One Symbol
      isdemo: isDemo,
      settlementMode: booleanToNumber(settlementMode),
    };

    marketInvoker.mutate({
      ...config,
      event: subscribeToMarket,
    });

    return () => {
      marketInvoker.mutate({
        ...config,
        event: unSubscribeFromMarket,
      });
    };
  }, [symbol, isDemo, settlementMode]);
  //#endregion

  return null;
}
