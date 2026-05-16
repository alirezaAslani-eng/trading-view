import { object, string } from "zod";

const verifyAuthOTPSchema = object({
  code: string().length(6),
});

export default verifyAuthOTPSchema;
