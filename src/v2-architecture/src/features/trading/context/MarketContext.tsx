"use client";
import { MarketSubscribeProvider } from "@/context/feature/market/MarketSubscribeProvider";
import { TradeModeProvider } from "@/context/feature/trade/TradeMode";
import { GenericConfirmDialog } from "@/packages/nice-modal-react";
import { show } from "@ebay/nice-modal-react";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

export function MarketProvider({ children }: PropsWithChildren) {
  return (
    <TradeModeProvider>
      <SettlementModeProvider>
        <MarketSubscribeProvider>{children}</MarketSubscribeProvider>
      </SettlementModeProvider>
    </TradeModeProvider>
  );
}

export default MarketProvider;

//#region // * ------------ SettlementModeContext ------------

type SettlementMode = boolean;

type SettlementModeContextValue = {
  settlementMode: SettlementMode;
  setMode: (mode: SettlementMode) => void;
  toggleMode: () => void;
};

const SettlementModeContext = createContext<SettlementModeContextValue | null>(
  null,
);

function SettlementModeProvider({ children }: PropsWithChildren) {
  const [settlementMode, setSettlementMode] = useState<SettlementMode>(false);

  const setMode = useCallback(async (mode: SettlementMode) => {
    if (mode) {
      const confirm = await conferimMode();
      if (!confirm) return;
    }
    setSettlementMode(mode);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(!settlementMode);
  }, [settlementMode]);

  const value: SettlementModeContextValue = {
    settlementMode,
    setMode,
    toggleMode,
  };

  return (
    <SettlementModeContext value={value}>{children}</SettlementModeContext>
  );
}
export const useSettlementMode = () => useContext(SettlementModeContext);

//#endregion // * ------------ SettlementModeContext ------------

function conferimMode() {
  return show(GenericConfirmDialog, {
    color: "primary",
    title: "توجه به نحوه تسویه معامله",
    description:
      "شما در حال ثبت معامله با حالت تسویه ۱۰٪ هستید. در این حالت تنها ۱۰٪ مبلغ معامله در ابتدا پرداخت می‌شود و ۹۰٪ باقی‌مانده به‌عنوان بدهی شما ثبت خواهد شد. شما حداکثر ۳ روز فرصت دارید بدهی ایجادشده را تسویه کنید.",
  });
}
