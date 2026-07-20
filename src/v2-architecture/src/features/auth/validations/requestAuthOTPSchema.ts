import { phoneNumberValidation } from "@/v2-architecture/src/shared/validations";
import { object } from "zod";

const requestAuthOTPSchema = object({
  identifier: phoneNumberValidation(),
});

export default requestAuthOTPSchema;
