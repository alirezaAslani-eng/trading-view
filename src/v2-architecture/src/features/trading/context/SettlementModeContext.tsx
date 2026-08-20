"use client";
import { AgreementPromiseDialog } from "@/packages/nice-modal-react";
import { useDismiss } from "@/v2-architecture/src/shared/hooks";
import { show } from "@ebay/nice-modal-react";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type SettlementMode = boolean;

type SettlementModeContextValue = {
  settlementMode: SettlementMode;
  setMode: (mode: SettlementMode) => void;
  toggleMode: () => void;
};

const SettlementModeContext = createContext<SettlementModeContextValue | null>(
  null,
);

export function SettlementModeProvider({ children }: PropsWithChildren) {
  const [settlementMode, setSettlementMode] = useState<SettlementMode>(false);

  const { dismiss, isDismised } = useDismiss("dismis-settlement-dialog");

  const setMode = async (mode: SettlementMode) => {
    if (mode && !isDismised) {
      const confirm = await show(AgreementPromiseDialog, {
        title: "توجه به نحوه تسویه معامله",
        rules:
          "شما در حال ثبت معامله با حالت تسویه ۱۰٪ هستید. در این حالت تنها ۱۰٪ مبلغ معامله در ابتدا پرداخت می‌شود و ۹۰٪ باقی‌مانده به‌عنوان بدهی شما ثبت خواهد شد. شما حداکثر ۳ روز فرصت دارید بدهی ایجادشده را تسویه کنید.",
      });
      if (!confirm) return;
      dismiss();
    }
    setSettlementMode(mode);
  };

  const toggleMode = () => {
    setMode(!settlementMode);
  };

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

