import { object, string } from "zod";
import type { Infer } from "zod";
import userBaseSchema from "../user/userBaseSchema";

const clientEnvScheam = object({
  NEXT_PUBLIC_BASEURL: string().url(),
  NEXT_PUBLIC_USER_IDENTIFIER: userBaseSchema.shape.phone,
});

// * ---- Validation ----
const envObj = process.env;
const validationResult = clientEnvScheam.safeParse({
  NEXT_PUBLIC_BASEURL: envObj.NEXT_PUBLIC_BASEURL as string,
  NEXT_PUBLIC_USER_IDENTIFIER: envObj.NEXT_PUBLIC_USER_IDENTIFIER as string,
} satisfies Infer<typeof clientEnvScheam>);

if (!validationResult.success)
  console.error("Env validation error : " + validationResult.error.message);

const clientEnv = validationResult.data;
export default clientEnv;
