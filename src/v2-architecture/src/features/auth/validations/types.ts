import type { Infer } from "zod";
import type requestAuthOTPSchema from "./requestAuthOTPSchema";
import type verifyAuthOTPSchema from "./verifyAuthOTPSchema";

// * -----start------ requestAuthOTPSchema.ts -----------
type RequestAuthOTPSchemaType = Infer<typeof requestAuthOTPSchema>;
// * -----start------ requestAuthOTPSchema.ts -----------

// * -----start------ verifyAuthOTPSchema.ts -----------
type VerifyAuthOTPSchemaType = Infer<typeof verifyAuthOTPSchema>;
// * -----start------ verifyAuthOTPSchema.ts -----------

export type { RequestAuthOTPSchemaType, VerifyAuthOTPSchemaType };
