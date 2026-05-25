"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import kycModalReducer from "./kycModalReducer";
import { KycModalContextValue, KycModalState } from "./types";

const KycModalContext = createContext({} as KycModalContextValue);
const defaultState: KycModalState = {
  modalFlow: null,
};

function KycModalProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(kycModalReducer, defaultState);

  const openKycModal: KycModalContextValue["openKycModal"] = (
    currentKycLevel,
  ) => {
    dispatch({ type: "UPGRADE_KYC_LEVEL", payload: { currentKycLevel } });
  };

  const closeKycModal = () => {
    dispatch({ type: "EXIT_KYC_FLOW" });
  };

  const successKycModal = () => {
    dispatch({ type: "SUCCESS_KYC" });
  };

  const contextValue: KycModalContextValue = {
    closeKycModal,
    openKycModal,
    successKycModal,
    state,
  };
  return <KycModalContext value={contextValue}>{children}</KycModalContext>;
}

function useKycModal(): KycModalContextValue {
  return useContext(KycModalContext);
}

export { useKycModal, KycModalProvider };
