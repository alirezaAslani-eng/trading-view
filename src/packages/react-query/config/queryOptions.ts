import { DashboardInfoResponse, KycStatusResponse } from "@/api/types";
import type { ResponseErrorType } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { dashboardInfoKey, kycStatusKey } from "@/packages/react-query";
import { dashboardInfo, kycStatus } from "@/api";

const kycStatusConfig = () => {
  return queryOptions<
    KycStatusResponse,
    ResponseErrorType,
    KycStatusResponse,
    typeof kycStatusKey
  >({
    queryKey: kycStatusKey,
    queryFn: async () => {
      const res = await kycStatus();
      return res;
    },
  });
};

const dashboardInfoConfig = () => {
  return queryOptions<
    DashboardInfoResponse,
    ResponseErrorType,
    DashboardInfoResponse,
    typeof dashboardInfoKey
  >({
    queryKey: dashboardInfoKey,
    queryFn: async () => {
      const res = await dashboardInfo();
      return res;
    },
  });
};

export { kycStatusConfig , dashboardInfoConfig };
