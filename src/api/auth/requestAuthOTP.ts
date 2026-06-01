import { RequestAuthOTPSchemaType } from "@/validations/types";
import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responseErrorHandler";
import mutationFetch from "@/utils/app/mutationFetch";
import { sharedRequestInit } from "../sharedRequestInit";

const URL = `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/auth/send-otp`;
async function requestAuthOTP(body: RequestAuthOTPSchemaType): Promise<void> {
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

  await responseErrorHandler(res);
}

export default requestAuthOTP;
