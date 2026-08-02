import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { SigninSchema } from "@/validations/auth/signinSchema";

export interface SigninVariables extends SigninSchema {}

const URL = apiClient.baseURL("/api/v1/auth/login-password");

export const signin = async ({ signal, body }: Config): Promise<void> => {
  const res = await apiClient.post(URL, { signal, body: JSON.stringify(body) });
  await apiError.jsonHandler(res);
};

type Config = ApiConfig<{ body: SigninVariables }>;
