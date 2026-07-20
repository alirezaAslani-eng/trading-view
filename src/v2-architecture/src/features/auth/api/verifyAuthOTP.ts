import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { VerifyAuthOTPSchemaType } from "../validations";

const URL = apiClient.baseURL("/api/v1/auth/login-cookie");

export async function verifyAuthOTP({
  body,
  signal,
}: Config): Promise<VerifyAuthOTPData> {
  const res = await apiClient.post(URL, {
    body: JSON.stringify(body),
    signal,
  });

  return apiError.jsonHandler<VerifyAuthOTPData>(res);
}

export type VerifyAuthOTPVariables = VerifyAuthOTPSchemaType;
export interface VerifyAuthOTPData {
  message: string;
  token: string;
}

type Config = ApiConfig<{
  body: VerifyAuthOTPVariables;
}>;
