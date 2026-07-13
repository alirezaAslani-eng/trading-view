"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export const BANK_MODAL_STATE = {
  iban: "iban",
  cardNumber: "card-number",
} as const;

export type BankModalState =
  | (typeof BANK_MODAL_STATE)[keyof typeof BANK_MODAL_STATE]
  | null;

interface BankModalContextType {
  modal: BankModalState;
  openModal: (modal: Exclude<BankModalState, null>) => void;
  closeModal: () => void;
}

const BankModalContext = createContext<BankModalContextType | null>(null);

export function BankModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<BankModalState>(null);

  const openModal = (modal: Exclude<BankModalState, null>) => {
    setModal(modal);
    console.log("TEST ----");
    
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <BankModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </BankModalContext.Provider>
  );
}

export function useBankModal() {
  const context = useContext(BankModalContext);
  return context;
}
