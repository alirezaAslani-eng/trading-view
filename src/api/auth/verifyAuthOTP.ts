import fetchHandler from "@/utils/app/fetchHandler";
import jsonParseHandler from "@/utils/app/jsonParseHandler";
import responseErrorHandler from "@/utils/app/responsiveErrorHandler";
import clientEnv from "@/validations/env/clientEnv";
import { VerifyAuthOTPSchemaType } from "@/validations/types";

const URL = `${clientEnv?.NEXT_PUBLIC_BASEURL}/api/v1/auth/login-cookie`;

// TODO -> The type of fetched data must be defined by TS
async function verifyAuthOTP(body: VerifyAuthOTPSchemaType): Promise<unknown> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  await responseErrorHandler(res);

  const data = await jsonParseHandler(res);

  return data;
}

export default verifyAuthOTP;
