"use client";
import safeAsync from "@/utils/app/safeAsync";
import { TradeModeStore } from "./helpers";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useContext } from "react";
import { TradeModeContext } from "./TradeModeContext";
import { enableDemoConfig } from "@/packages/react-query";

export const useTradeMode = () => {
  const context = useContext(TradeModeContext);

  const { isDemo, setIsDemo } = context!;

  const demoMutation = useMutation(enableDemoConfig());

  const toReal = useCallback(() => {
    setIsDemo(false);
  }, []);

  const toDemo = useCallback(async () => {
    if (!TradeModeStore.isExpiredDemo()) {
      setIsDemo(true);
      return;
    }
    const res = await safeAsync(() => demoMutation.mutateAsync());
    if (!res.ok) return;
    TradeModeStore.storeExpIn(new Date(res.data.expirationDate).getTime());
    setIsDemo(true);
  }, []);

  const toggle = useCallback(() => {
    if (isDemo) {
      toReal();
      return;
    }
    toDemo();
  }, [isDemo]);

  return {
    toggle,
    toDemo,
    toReal,
    isDemo,
    isSwitching: demoMutation.isPending,
  };
};
