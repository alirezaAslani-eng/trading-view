
// * --start-- kycModalSlice.ts type ----
interface KycFlowState {
  modalFlow:"needKyc"| "upgradeKyc" | "successKyc" | null;
  
}
// * --end-- kycModalSlice.ts type ----

export type { KycFlowState };
