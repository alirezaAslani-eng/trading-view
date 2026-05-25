import { KycLevel } from "@/types";

// * --start-- payload types ----
interface UpgradeKycLevelPayload {
  currentKycLevel: KycLevel;
}
// * --end-- payload types ----

// * --start-- Action Types -----
interface SuccessKycAction {
  type: "SUCCESS_KYC";
}
interface EndKycAction {
  type: "EXIT_KYC_FLOW";
}
interface UpgradeKycLevelAction {
  type: "UPGRADE_KYC_LEVEL";
  payload: UpgradeKycLevelPayload;
}
type ReducerAction = UpgradeKycLevelAction | SuccessKycAction | EndKycAction;
// * --end-- Action Types -----

// * --start-- state type ----
interface KycModalState {
  modalFlow: "kycLevel1" | "kycLevel2" | "successKyc" | null;
}
// * --end-- state type ----

// * --start-- context types ----
interface KycModalContextValue {
  openKycModal: (
    currentKycLevel: UpgradeKycLevelPayload["currentKycLevel"],
  ) => void;
  closeKycModal: () => void;
  successKycModal: () => void;
  state: KycModalState;
}
// * --end-- context types ----

export type { KycModalContextValue, ReducerAction, KycModalState };
