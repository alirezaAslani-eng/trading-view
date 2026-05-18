import { object, string } from "zod";
import { phoneNumberValidation } from "@/validations/shared";

const verifyAuthOTPSchema = object({
  code: string().length(6),
  identifier: phoneNumberValidation(),
});

export default verifyAuthOTPSchema;
