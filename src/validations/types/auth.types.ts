import type { Infer } from "zod";
import type requestAuthOTPSchema from "../auth/requestAuthOTPSchema";

// * -----start------ requestAuthOTPSchema.ts -----------
type requestAuthOTPSchemaType = Infer<typeof requestAuthOTPSchema>;
// * -----start------ requestAuthOTPSchema.ts -----------

export type { requestAuthOTPSchemaType };
