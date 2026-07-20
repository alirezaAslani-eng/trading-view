import { phoneNumberValidation } from "@/v2-architecture/src/shared/validations";
import { object, string } from "zod";

const verifyAuthOTPSchema = object({
  code: string().length(6),
  identifier: phoneNumberValidation(),
});

export default verifyAuthOTPSchema;
