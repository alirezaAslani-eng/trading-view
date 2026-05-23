import { object, string } from "zod";
import type { Infer } from "zod";
import { phoneNumberValidation } from "@/validations/shared";

const clientEnvScheam = object({
  NEXT_PUBLIC_BASEURL: string(),
  NEXT_PUBLIC_USER_IDENTIFIER: phoneNumberValidation(),
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
