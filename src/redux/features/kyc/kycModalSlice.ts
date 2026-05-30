import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KycFlowState } from "./types";
import { KycLevel } from "@/types";
import { assertNever } from "@/utils";

const initialState: KycFlowState = {
  modalFlow: null,
};
const kycModalSlice = createSlice({
  name: "kycModal",
  initialState,
  reducers: {
    upgradeKycLevel(state, action: PayloadAction<KycLevel>) {
      state.modalFlow = decideToOpenModal(action.payload);
    },
    exitKycFlow(state) {
      state.modalFlow = null;
    },
    successKyc(state) {
      state.modalFlow = "successKyc";
    },
  },
});

// * ------- helpers -------
function decideToOpenModal(
  currentKycLevel: KycLevel,
): KycFlowState["modalFlow"] {
  if (currentKycLevel === "None") {
    return "kycLevel1";
  }
  if (currentKycLevel === "Level1_Basic") {
    return "kycLevel2";
  }
  if (currentKycLevel === "Level2_Advanced") {
    return null;
  }
  if (currentKycLevel === "Level3_Business") {
    return null;
  }
  assertNever(currentKycLevel);
  return null;
}

// * ------- Actions -------
const { exitKycFlow, successKyc, upgradeKycLevel } = kycModalSlice.actions;

export { kycModalSlice, exitKycFlow, successKyc, upgradeKycLevel };
