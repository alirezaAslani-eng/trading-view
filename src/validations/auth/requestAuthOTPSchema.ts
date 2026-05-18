import { object } from "zod";
import { phoneNumberValidation } from "@/validations/shared";

const requestAuthOTPSchema = object({
  identifier: phoneNumberValidation(),
});

export default requestAuthOTPSchema;
