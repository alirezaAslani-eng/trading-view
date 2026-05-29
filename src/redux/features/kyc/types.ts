
// * --start-- kycModalSlice.ts type ----
interface KycFlowState {
    modalFlow: "kycLevel1" | "kycLevel2" | "successKyc" | null;
}
// * --end-- kycModalSlice.ts type ----

export type { KycFlowState };
