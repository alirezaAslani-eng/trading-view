import { object, string } from "zod";
import type { Infer } from "zod";

const clientEnvScheam = object({
  NEXT_PUBLIC_BASEURL: string().url(),
});

// * ---- Validation ----
const validationResult = clientEnvScheam.safeParse({
  NEXT_PUBLIC_BASEURL: process.env.NEXT_PUBLIC_BASEURL as string,
} satisfies Infer<typeof clientEnvScheam>);

if (!validationResult.success)
  console.error("Env validation error : " + validationResult.error.message);

const clientEnv = validationResult.data;
export default clientEnv;
