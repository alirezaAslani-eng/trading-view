import { useMutation } from "@tanstack/react-query";
import { HubConnection } from "@microsoft/signalr";
import {
  marketHub,
  subscribeToMarket,
  unSubscribeFromMarket,
} from "@/packages/signalr";
import { apiError } from "@/v2-architecture/src/api";
import { signalRLog } from "./helpers";

export interface InvokeMarketConfig {
  con: HubConnection;
  symbols: string[];
  isdemo: boolean;
  settlementMode: 0 | 1;
  event: typeof subscribeToMarket | typeof unSubscribeFromMarket;
}

const invokeMarket = async (config: InvokeMarketConfig) => {
  const { con, settlementMode, symbols, isdemo, event } = config;

  try {
    await marketHub.start(con);
    signalRLog("market", "CONNECTION_STARTED");

    for (const symbol of symbols) {
      const payload = {
        event,
        symbol,
        isdemo,
        settlementMode,
      };
      signalRLog("market", "INVOKE_STARTED", { payload });
      await con.invoke(event, symbol, isdemo, settlementMode);
      signalRLog("market", "INVOKE_SUCCESS", { payload });
    }
  } catch (err) {
    signalRLog("market", "INVOKE_FAILED", { config, err });
    apiError.throwError(true, {
      message: "خطا در اتصال به بازار",
    });
  }
};

export const useMarketInvoker = () => {
  return useMutation({
    mutationFn: invokeMarket,
    meta: {
      disableSuccessAlert: true,
    },
  });
};
