import { KycLevel } from "@/types";

interface BasicKycApiResponse<TData> {
  isSuccess: boolean;
  data: TData;
  message: boolean;
  errorCode: null | string;
}

interface KycStatusResponse extends BasicKycApiResponse<{
  fullName: string;
  phoneNumber: string;
  kycLevel: KycLevel;
  isActive: boolean;
}> {}

export type { KycStatusResponse, BasicKycApiResponse };
