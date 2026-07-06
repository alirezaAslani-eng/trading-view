import { useDispatch } from "react-redux";
import { openAccessModal } from "@/redux/features/kyc/kycModalSlice";
export function useKycAccess(kycLevel: string) {
  const dispatch = useDispatch();
  return () => {
    if (kycLevel === "None") {
      dispatch(openAccessModal());
      return false;
    }
    return true;
  };
}
