import { Infer, input, output } from "zod";
import type kvcL1Schema from "../kyc/kycL1Schema";
import type kycL2Schema from "../kyc/kycL2Schema";

// * -----start---- kvcL1Schema.ts ------------
type KycL1SchemaType = Infer<typeof kvcL1Schema>;
type KycL1SchemaInput = input<typeof kvcL1Schema>;
type KycL1SchemaOutput = output<typeof kvcL1Schema>;
// * -----end---- kvcL1Schema.ts ------------

// * -----start---- kvcL2Schema.ts ------------
type KycL2SchemaType = Infer<typeof kycL2Schema>;
// * -----end---- kvcL2Schema.ts ------------

export type {
  KycL1SchemaType,
  KycL2SchemaType,
  KycL1SchemaInput,
  KycL1SchemaOutput,
};
