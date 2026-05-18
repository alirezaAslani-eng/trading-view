import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responsiveErrorHandler";
import clientEnv from "@/validations/env/clientEnv";
import { VerifyAuthOTPSchemaType } from "@/validations/types";

const staticBody = {
  grant_type: "otp",
  client_id: "react-app",
  client_secret: "secret",
  scope: "openid profile kyc offline_access",
};
const URL = `${clientEnv?.NEXT_PUBLIC_BASEURL}/connect/token`;

// TODO -> The type of fetched data must be defined by TS
async function verifyAuthOTP(body: VerifyAuthOTPSchemaType): Promise<unknown> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        ...staticBody,
        ...body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  await responseErrorHandler(res);

  const data = await res.json();

  return data;
}

export default verifyAuthOTP;
