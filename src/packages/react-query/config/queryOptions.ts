import { KycStatusResponse } from "@/api/types";
import type { ResponseErrorType } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { kycStatusKey } from "@/packages/react-query";
import { kycStatus } from "@/api";

const kycStatusConfig = () => {
  return queryOptions<
    KycStatusResponse,
    ResponseErrorType,
    KycStatusResponse,
    typeof kycStatusKey
  >({
    queryKey: kycStatusKey,
    queryFn: kycStatus,
  });
};

export { kycStatusConfig };
