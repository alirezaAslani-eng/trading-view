import { Infer } from "zod";
import type withdrawSchema from "../transaction/withdrawSchema";

// * -----start---- withdrawSchema.ts ------------
type WithdrawSchemaType = Infer<typeof withdrawSchema>;
// * -----end---- withdrawSchema.ts ------------

export type { WithdrawSchemaType };
