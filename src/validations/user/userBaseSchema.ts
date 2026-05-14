import { object, string } from "zod";

const userBaseSchema = object({
  phone: string().regex(/^09[0-9]{9}$/, "شماره نامعتبر هست"),
});

export default userBaseSchema;
