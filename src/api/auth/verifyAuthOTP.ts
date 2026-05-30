import fetchHandler from "@/utils/app/fetchHandler";
import jsonParseHandler from "@/utils/app/jsonParseHandler";
import responseErrorHandler from "@/utils/app/responsiveErrorHandler";
import { VerifyAuthOTPSchemaType } from "@/validations/types";
import { VerifyAuthOTPResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { createApiUrl } from "@/utils";

const URL = createApiUrl("/api/v1/auth/login-cookie");

// TODO -> The type of fetched data must be defined by TS
async function verifyAuthOTP(
  body: VerifyAuthOTPSchemaType,
): Promise<VerifyAuthOTPResponse> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  await responseErrorHandler(res);

  const data = (await jsonParseHandler(res)) as VerifyAuthOTPResponse;

  return data;
}

export default verifyAuthOTP;
