import { Infer } from "zod";
import type kvcL1Schema from "../kyc/kycL1Schema";

// * -----start---- kvcL1Schema.ts ------------
type KycL1SchemaType = Infer<typeof kvcL1Schema>;
// * -----end---- kvcL1Schema.ts ------------

export type { KycL1SchemaType };
