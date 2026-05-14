import userBaseSchema from "@/validations/user/userBaseSchema";

const requestAuthOTPSchema = userBaseSchema.pick({ phone: true });

export default requestAuthOTPSchema;
