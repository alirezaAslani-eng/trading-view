import { passwordValidation } from "@/validations/shared";
import { type infer as Infer, object, string } from "zod";

export const createPasswordSchema = object({
  NewPassword: passwordValidation(),
  confirmPassword: string().min(1, "تکرار رمز عبور الزامی است"),
}).superRefine((data, ctx) => {
  if (data.NewPassword !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "رمز عبور و تکرار آن یکسان نیستند",
      path: ["confirmPassword"],
    });
  }
});

export type CreatePasswordSchema = Infer<typeof createPasswordSchema>;
