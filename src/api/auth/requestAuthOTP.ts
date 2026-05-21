import clientEnv from "@/validations/env/clientEnv";
import { RequestAuthOTPSchemaType } from "@/validations/types";
import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responsiveErrorHandler";
import mutationFetch from "@/utils/app/mutationFetch";
import { sharedRequestInit } from "../sharedRequestInit";

async function requestAuthOTP(body: RequestAuthOTPSchemaType): Promise<void> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(
      `${clientEnv?.NEXT_PUBLIC_BASEURL}/api/v1/auth/send-otp`,
      {
        ...sharedRequestInit,
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res;
  })) as Response;

  await responseErrorHandler(res);
}

export default requestAuthOTP;
