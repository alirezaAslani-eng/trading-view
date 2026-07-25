import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { kycL3Key } from "./keys";
import { kycL3, KycL3Variables } from "../api";

export const kycL3Config = createMutationOptions({
  mutationKey: kycL3Key,
  meta: { successMessage: "احراز سطح 3 شما ثبت شد" },
  mutationFn: (vars: KycL3Variables) => {
    return kycL3({ body: vars });
  },
});
