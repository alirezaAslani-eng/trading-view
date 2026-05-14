import userBaseSchema from "@/validations/user/userBaseSchema";
import { object } from "zod";

const requestAuthOTPSchema = object({
  identifier: userBaseSchema.shape.phone,
});

export default requestAuthOTPSchema;
