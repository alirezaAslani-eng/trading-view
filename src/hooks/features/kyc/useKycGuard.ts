import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import isKycStepPassed from "@/utils/features/kyc/isKycStepPassed";
import { KycLevel } from "@/types";
import { kycStatusConfig } from "@/packages/react-query";
import { needKyc } from "@/redux/features/kyc";

function useKycGuard() {
  const dispatch = useDispatch();

  const { data, isSuccess } = useQuery(kycStatusConfig());

  const currentLevel = data?.kycLevel;

  function checkAccess(requiredLevel: KycLevel): boolean {
    if (!isSuccess) return false;

    const passed = isKycStepPassed(currentLevel, requiredLevel);

    if (!passed) {

     dispatch(needKyc());
    }

    return passed;
  }

  return { checkAccess, currentLevel };
}

export default useKycGuard;
