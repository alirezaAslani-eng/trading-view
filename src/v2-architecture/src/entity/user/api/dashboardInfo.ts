import { KycLevel } from "@/v2-architecture/src/entity/kyc";
import { PermissionGroup } from "@/v2-architecture/src/entity/permission";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const URL = apiClient.authBaseURL("/api/v1/user/dashboard");

export const dashboardInfo = async ({
  signal,
}: ApiConfig = {}): Promise<DashboardInfoData> => {
  const res = await apiClient.get(URL, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<DashboardInfoData>>(res);
  return raw.data;
};

//#region // * ------------ Types ------------
export interface DashboardInfoData {
  id: string;
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
  limits: {
    maxTx: string;
    daily: string;
    comm: string;
  };
}
//#endregion // * ------------ Types ------------
