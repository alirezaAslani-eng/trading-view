import { PermissionGroup } from "@/constant/features/permission/permissionGroups";
import { KycLevel, WithID } from "@/types";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/user/dashboard");

export const dashboardInfo = async ({
  signal,
}: ApiConfig = {}): Promise<DashboardInfoData> => {
  const res = await apiClient.get(url, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<DashboardInfoData>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export interface DashboardInfoData extends WithID {
  fullName: string;
  email: string | null;
  mobile: string;
  kycLevel: KycLevel;
  userTier: string;
  isActive: boolean;
  userPermissionGroups: PermissionGroup[];
  isEmailVerified: boolean;
  isNationalIdVerified: boolean;
  nationalId: string | null;
  birthDate: string | null;
  bankAccountsCount: number;
  addressesCount: number;
  monthlyTransactionVolume: number;
  lastLoginAt: string;
  avatarUrl: string | null;
  hasPassword: boolean;
  limits: {
    maxTx: string;
    daily: string;
    comm: string;
  };
}
//#endregion // * ------------ Shared types ------------
