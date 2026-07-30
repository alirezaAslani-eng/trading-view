import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { VerifyAuthOTPSchemaType } from "@/validations/types";
import { VerifyAuthOTPResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import mutationFetch from "@/utils/app/mutationFetch";
import { BaseApiResponse } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/auth/login-cookie`;

// TODO -> The type of fetched data must be defined by TS
async function verifyAuthOTP(
  body: VerifyAuthOTPSchemaType,
): Promise<VerifyAuthOTPResponse> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<VerifyAuthOTPResponse>;

  return data.data;
}

export default verifyAuthOTP;
