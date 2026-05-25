import { assertNever } from "@/utils";
import { KycModalState, ReducerAction } from "./types";
import { KycLevel } from "@/types";

// * Race condition, (onSuccess has side effect !)
export default function kycModalReducer(
  prevState: KycModalState,
  action: ReducerAction,
): KycModalState {
  console.log({ prevState, action });

  switch (action.type) {
    case "EXIT_KYC_FLOW": {
      return { modalFlow: null };
    }
    case "SUCCESS_KYC": {
      return { modalFlow: "successKyc" };
    }
    case "UPGRADE_KYC_LEVEL": {
      const currentKycLevel = action.payload.currentKycLevel;
      return decideToOpenModal(currentKycLevel);
    }
    default: {
      assertNever(action);
      return { modalFlow: null };
    }
  }
}

function decideToOpenModal(currentKycLevel: KycLevel): KycModalState {
  if (currentKycLevel === "None") {
    return { modalFlow: "kycLevel1" };
  }
  if (currentKycLevel === "Level1_Basic") {
    return { modalFlow: "kycLevel2" };
  }
  if (currentKycLevel === "Level2_Advanced") {
    return { modalFlow: null };
  }
  if (currentKycLevel === "Level3_Business") {
    return { modalFlow: null };
  }
  assertNever(currentKycLevel);
  return { modalFlow: null };
}
