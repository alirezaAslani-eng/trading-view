import { KycLevel } from "@/types";
import { KycL1SchemaType } from "@/validations/types";

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
interface KycL1RequestBody extends Omit<
  KycL1SchemaType,
  "birthDay" | "birthYear" | "birthMonth"
> {
  birthDateShamsi: string;
}
{
}

export type { KycStatusResponse, BasicKycApiResponse, KycL1RequestBody };
