import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { kycL3Key, kycProgressKey } from "./keys";
import { kycL3, KycL3Variables } from "../api";
import { dashboardInfoKey, kycStatusKey } from "@/packages/react-query";

export const kycL3Config = createMutationOptions({
  mutationKey: kycL3Key,
  meta: {
    successMessage: "احراز سطح 3 شما ثبت شد",
    invalidates: [kycStatusKey, kycProgressKey, dashboardInfoKey],
  },
  mutationFn: (vars: KycL3Variables) => {
    return kycL3({ body: vars });
  },
});
