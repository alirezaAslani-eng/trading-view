import clientEnv from "@/validations/env/clientEnv";
import { BaseApiResponse } from "@/types";
import { requestAuthOTPSchemaType } from "@/validations/types";

async function requestAuthOTP(
  body: requestAuthOTPSchemaType,
): Promise<BaseApiResponse> {
  const res = await fetch(
    `${clientEnv?.NEXT_PUBLIC_BASEURL}/api/v1/auth/send-otp`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = (await res.json()) as BaseApiResponse;

  return data;
}

export default requestAuthOTP;
