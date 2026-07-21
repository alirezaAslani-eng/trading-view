import { Address, KycLevel } from "@/types";
import { KycL1SchemaOutput, KycL1SchemaType } from "@/validations/types";

// * --start-- kycStatus.ts ----
interface KycStatusResponse {
  fullName: string;
  phoneNumber: string;
  kycLevel: KycLevel;
  isActive: boolean;
}

// * --end-- kycStatus.ts ----

// * --start-- kycL1.ts ----
type KycL1RequestBody = KycL1SchemaOutput;
// * --end-- kycL1.ts ----

// * --start-- kycL2.ts ----
type KycL2Response = Address[];
// * --end-- kycL2.ts ----

export type { KycStatusResponse, KycL1RequestBody, KycL2Response };
