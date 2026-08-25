// --- updateEmailSchema.ts ---

import { type infer as Infer, object, string } from "zod";

export const updateEmailSchema = object({
  email: string("ایمیل نامعتبر است").email("ایمیل نامعتبر است"),
});

export type UpdateEmailSchema = Infer<typeof updateEmailSchema>;