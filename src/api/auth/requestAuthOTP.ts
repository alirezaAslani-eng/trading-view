import clientEnv from "@/validations/env/clientEnv";
import { requestAuthOTPSchemaType } from "@/validations/types";
import throwError from "@/utils/app/throwError";
import ResponseError from "@/utils/app/ResponseError";
import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responsiveErrorHandler";

async function requestAuthOTP(body: requestAuthOTPSchemaType): Promise<void> {
  try {
    const res = (await fetchHandler(async () => {
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
      return res;
    })) as Response;

    await responseErrorHandler(res);
  } catch (err) {
    throwError(true, err as ResponseError);
  }
}

export default requestAuthOTP;
