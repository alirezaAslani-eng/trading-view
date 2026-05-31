import { createSlice } from "@reduxjs/toolkit";
import { KycFlowState } from "./types";

const initialState: KycFlowState = {
  modalFlow: null,
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
  },
});

// * ------- Actions -------
const { exitKycFlow, successKyc, upgradeKycLevel } = kycModalSlice.actions;

export { kycModalSlice, exitKycFlow, successKyc, upgradeKycLevel };
