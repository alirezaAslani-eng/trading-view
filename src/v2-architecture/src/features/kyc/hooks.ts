import { useDispatch } from "@/v2-architecture/src/store";
import { useQuery } from "@tanstack/react-query";
import { KycLevel, kycStatusConfig } from "@/v2-architecture/src/entity/kyc";
import { isKycStepPassed } from "./helpers";
import { needKyc } from "./redux";

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
