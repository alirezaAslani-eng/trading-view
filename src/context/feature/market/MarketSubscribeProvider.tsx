"use client";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HubConnection } from "@microsoft/signalr";
import { symbolsConfig } from "@/packages/react-query";
import {
  marketHub,
  subscribeToMarket,
  unSubscribeFromMarket,
} from "@/packages/signalr";
import useSymbolParams from "@/hooks/features/trading/useSymbolParams";
import { useTradeMode } from "../trade/TradeMode";
import { useSettlementMode } from "@/v2-architecture/src/features/trading";
import { apiError } from "@/v2-architecture/src/api";

interface MarketSubscribeContextValue {
  isPending: boolean;
  isError: boolean;
  shouldListenerStop: boolean;
}

const MarketSubscribeContext =
  createContext<MarketSubscribeContextValue | null>(null);

export function MarketSubscribeProvider({ children }: PropsWithChildren) {
  //#region // * ------------ Needed state to invoke ------------
  const activeSymbol = useSymbolParams()[0] as string | undefined;
  const { isDemo } = useTradeMode();
  const { settlementMode } = useSettlementMode()!;
  //#endregion

  //#region // * ------------ Data : Symbols ------------
  const { data: symbols, isSuccess: isSuccessSymbols } =
    useQuery(symbolsConfig());
  //#endregion

  //#region // * ------------ Mutation ------------
  const subscribeMutation = useMutation({
    mutationFn: invokeMarket,
    meta: {
      disableSuccessAlert: true,
    },
  });

  const unSubscribeMutation = useMutation({
    mutationFn: invokeMarket,
    meta: {
      disableSuccessAlert: true,
    },
  });
  //#endregion

  //#region // * ------------ Subscribe / Unsubscribe ------------
  useEffect(() => {
    if (!isSuccessSymbols) return;

    const con = marketHub.build();

    const config: StartMarketConfig = {
      con,
      event: subscribeToMarket,
      isdemo: isDemo,
      activeSymbol,
      settlementMode,
      symbols: symbols.map((s) => s.name),
    };

    subscribeMutation.mutate(config);

    return () => {
      unSubscribeMutation.mutate({
        ...config,
        event: unSubscribeFromMarket,
      });
    };
  }, [activeSymbol, isDemo, settlementMode, symbols, isSuccessSymbols]);
  //#endregion

  const isPending =
    subscribeMutation.isPending || unSubscribeMutation.isPending;

  const isError = subscribeMutation.isError || unSubscribeMutation.isError;

  return (
    <MarketSubscribeContext
      value={{
        isError,
        isPending,
        shouldListenerStop: isPending || isError,
      }}
    >
      {children}
    </MarketSubscribeContext>
  );
}

export function useMarketSubscribe() {
  const context = useContext(MarketSubscribeContext);
  return context;
}

interface StartMarketConfig {
  con: HubConnection;
  symbols: string[];
  activeSymbol: string | undefined;
  isdemo: boolean;
  settlementMode: boolean;
  event: string;
}

const invokeMarket = async (config: StartMarketConfig) => {
  const { con, settlementMode, symbols, isdemo, event, activeSymbol } = config;

  try {
    console.log("Start invoking to marketHub", config);

    await marketHub.start(con);

    for (const symbol of symbols) {
      await con.invoke(
        event,
        symbol,
        isdemo,
        activeSymbol === symbol ? (settlementMode ? 1 : 0) : 0,
      );
    }

    console.log(`Invoked successfully to marketHub`, config);
  } catch (err) {
    console.log("Failed to invok to marketHub", err);

    apiError.throwError(true, {
      message: "خطا در اتصال به بازار",
    });
  }
};
