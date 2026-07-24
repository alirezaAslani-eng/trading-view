import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/v2-architecture/src/store";

interface KycFlowState {
  modalFlow: "needKyc" | "upgradeKyc" | "successKyc" | null;
}

const initialState: KycFlowState = {
  modalFlow: null,
};

const kycModalSlice = createSlice({
  name: "kycModal",
  initialState,
  reducers: {
    needKyc(state) {
      state.modalFlow = "needKyc";
    },
    upgradeKycLevel(state) {
      state.modalFlow = "upgradeKyc";
    },
    exitKycFlow(state) {
      state.modalFlow = null;
    },
    successKyc(state) {
      state.modalFlow = "successKyc";
    },
  },
});

//#region // * ------------ Actions ------------
const { exitKycFlow, successKyc, upgradeKycLevel, needKyc } =
  kycModalSlice.actions;
//#endregion // * ------------ Actions ------------

//#region // * ------------ Selectors ------------
const kycModalFlow = (state: RootState) => state.kycModal.modalFlow;
//#endregion // * ------------ Selectors ------------

export {
  kycModalSlice,
  exitKycFlow,
  successKyc,
  upgradeKycLevel,
  needKyc,
  kycModalFlow,
};
