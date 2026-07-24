import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { dashboardInfoKey } from "@/v2-architecture/src/entity/user";
import { kycL1, KycL1Variables, kycL2, KycL2Variables } from "../api";
import { kycLevel1Key, kycLevel2Key, kycStatusKey } from "./keys";

export const kycLevel1Config = createMutationOptions({
  mutationKey: kycLevel1Key,
  mutationFn: (vars: KycL1Variables) => kycL1({ body: vars }),
  meta: {
    invalidates: [kycStatusKey, dashboardInfoKey],
  },
});

export const kycLevel2Config = createMutationOptions({
  mutationKey: kycLevel2Key,
  mutationFn: (vars: KycL2Variables) => kycL2({ body: vars }),
  meta: {
    invalidates: [kycStatusKey, dashboardInfoKey],
  },
});
