import { KycLevel, WithID } from "@/types";

interface DashboardInfoResponse extends WithID {
  fullName: string;
  email: string | null;
  mobile: string;
  kycLevel: KycLevel;
  isActive: boolean;
  isEmailVerified: boolean;
  isNationalIdVerified: boolean;
  bankAccountsCount: number;
  addressesCount: number;
  monthlyTransactionVolume: number;
  limits: {
    maxTx: string;
    daily: string;
    comm: string;
  };
}

export type { DashboardInfoResponse };
