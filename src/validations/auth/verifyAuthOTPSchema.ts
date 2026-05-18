import { object, string } from "zod";
import userBaseSchema from "../user/userBaseSchema";

const verifyAuthOTPSchema = object({
  code: string().length(6),
  identifier: userBaseSchema.shape.phone,
});

export default verifyAuthOTPSchema;
