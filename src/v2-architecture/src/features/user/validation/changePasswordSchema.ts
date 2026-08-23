// --- changePasswordSchema.ts ---

import { passwordValidation } from "@/validations/shared";
import { type infer as Infer, object } from "zod";

export const changePasswordSchema = object({
  currentPassword: passwordValidation(),
  newPassword: passwordValidation(),
  confirmNewPassword: passwordValidation(),
})
  // TODO This pies of code can be reusable
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "رمز عبور و تکرار آن یکسان نیستند",
        path: ["confirmNewPassword"],
      });
    }
  });

export type ChangePasswordSchema = Infer<typeof changePasswordSchema>;
