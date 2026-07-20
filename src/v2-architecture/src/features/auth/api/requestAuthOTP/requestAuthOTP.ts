import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { RequestAuthOTPSchemaType } from "@/v2-architecture/src/features/auth/validations";
import { authOTPStore } from "./authOTPStore";

const URL = apiClient.baseURL("/api/v1/auth/send-otp");

const OTP_RATE_MESSAGE =
  "شما به سقف مجاز درخواست کد تأیید رسیده‌اید. لطفاً کمی بعد دوباره تلاش کنید.";

export async function requestAuthOTP({
  body,
  signal,
}: Config): Promise<RequestAuthOTPData> {
  const { identifier } = body;

  const res = await apiClient.post(URL, {
    body: JSON.stringify(body),
    signal,
  });

  // ! On 429, read remaining time from local store and pass it in error details
  const details: RequestAuthOTPData = {
    expIn: authOTPStore.getRemainingTime(identifier),
  };
  apiError.throwError(res.status === 429, {
    message: OTP_RATE_MESSAGE,
    status: res.status,
    statusText: res.statusText,
    details,
  });

  await apiError.jsonHandler(res);

  // Successful request → upsert the OtpEntity and return remaining time
  const otp_entity = authOTPStore.upsert(identifier);

  return { expIn: otp_entity.expIn - Date.now() };
}

export interface RequestAuthOTPData {
  expIn: number;
}
export interface RequestAuthOTPVariables extends RequestAuthOTPSchemaType {}

type Config = ApiConfig<{
  body: RequestAuthOTPVariables;
}>;
