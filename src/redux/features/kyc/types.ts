
// * --start-- kycModalSlice.ts type ----
interface KycFlowState {
  modalFlow: "upgradeKyc" | "successKyc" | null;
  open:boolean
}
// * --end-- kycModalSlice.ts type ----

export type { KycFlowState };
