"use client";

import { PropsWithChildren, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { symbolsConfig } from "@/packages/react-query";
import { useTradeMode } from "../trade/TradeMode";
import {
  marketHub,
  subscribeToMarket,
  unSubscribeFromMarket,
} from "@/packages/signalr";
import {
  InvokeMarketConfig,
  useMarketInvoker,
} from "@/packages/signalr/invokers";

export function JoinMarketsProvider() {
  //#region // * ------------ Needed state ------------
  const { isDemo } = useTradeMode();
  //#endregion

  //#region // * ------------ Data : Symbols ------------
  const { data: symbols, isSuccess: isSuccessSymbols } =
    useQuery(symbolsConfig());
  //#endregion

  //#region // * ------------ Mutation ------------
  const marketInvoker = useMarketInvoker();
  //#endregion

  //#region // * ------------ Subscribe / Unsubscribe ------------
  useEffect(() => {
    if (!isSuccessSymbols) return;

    const con = marketHub.build();

    const config: InvokeMarketConfig = {
      con,
      event: subscribeToMarket,
      symbols: symbols.map((symbol) => symbol.name),
      isdemo: isDemo,
      settlementMode: 0,
    };

    marketInvoker.mutate(config);

    return () => {
      marketInvoker.mutate({
        ...config,
        event: unSubscribeFromMarket,
      });
    };
  }, [isDemo, symbols, isSuccessSymbols]);
  //#endregion

  return null;
}
