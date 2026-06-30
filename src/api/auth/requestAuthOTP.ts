import { RequestAuthOTPSchemaType } from "@/validations/types";
import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import mutationFetch from "@/utils/app/mutationFetch";
import { sharedRequestInit } from "../sharedRequestInit";
import throwError from "@/utils/app/throwError";
import { OTP_RAET_LIMIT_MESSAGE } from "@/constant/app/apiErrors";
import { otpStore } from "@/utils/features/otp/otpRateLimitStore";
import { RequestAuthOTPResponse } from "../types";

const URL = `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/auth/send-otp`;

async function requestAuthOTP(
  body: RequestAuthOTPSchemaType,
): Promise<RequestAuthOTPResponse> {
  const { identifier } = body;

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

  // ! On 429, read remaining time from local store and pass it in error details
  const details: RequestAuthOTPResponse = {
    expIn: otpStore.getRemainingTime(identifier),
  };
  throwError(res.status === 429, {
    message: OTP_RAET_LIMIT_MESSAGE,
    status: res.status,
    statusText: res.statusText,
    details,
  });

  await handleApiResponse(res);

  // Successful request → upsert the OtpEntity and return remaining time
  const otp_entity = otpStore.upsert(identifier);

  return { expIn: otp_entity.expIn - Date.now() };
}

export default requestAuthOTP;
