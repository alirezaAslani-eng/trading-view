import { PermissionGroup } from "@/constant/features/permission/permissionGroups";
import { KycLevel, WithID } from "@/types";

interface DashboardInfoResponse extends WithID {
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
  lastLoginAt:string,
  limits: {
    maxTx: string;
    daily: string;
    comm: string;
  };
}


export type { DashboardInfoResponse };
