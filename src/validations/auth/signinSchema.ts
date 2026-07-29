import { type infer as Infer, object } from "zod";
import { passwordValidation, phoneNumberValidation } from "../shared";

export const signinSchema = object({
  identifier: phoneNumberValidation(),
  password: passwordValidation(),
});

export type SigninSchema = Infer<typeof signinSchema>;
