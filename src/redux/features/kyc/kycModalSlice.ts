import { createSlice } from "@reduxjs/toolkit";
import { KycFlowState } from "./types";

const initialState: KycFlowState = {
  modalFlow: null,
  open:false
};

const kycModalSlice = createSlice({
  name: "kycModal",
  initialState,
  reducers: {
    upgradeKycLevel(state) {
      state.modalFlow = "upgradeKyc";
    },
    exitKycFlow(state) {
      state.modalFlow = null;
    },
    successKyc(state) {
      state.modalFlow = "successKyc";
    },
    openAccessModal(state){
      state.open=true;
    },
    closeAccesssModal(state){
      state.open=false
    }
  },
});

// * ------- Actions -------
const { exitKycFlow, successKyc, upgradeKycLevel,openAccessModal,closeAccesssModal } = kycModalSlice.actions;

export { kycModalSlice, exitKycFlow, successKyc, upgradeKycLevel,openAccessModal,closeAccesssModal };
