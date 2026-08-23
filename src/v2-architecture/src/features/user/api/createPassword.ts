import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { CreatePasswordSchema } from "../validation";

export interface CreatePasswordVariables extends CreatePasswordSchema {}

const URL = apiClient.authBaseURL("/api/v1/auth/set-password ");

export const createPassword = async ({
  signal,
  body,
}: Config): Promise<void> => {
  const res = await apiClient.post(URL, { signal, body: JSON.stringify(body) });
  await apiError.jsonHandler<void>(res);
};

type Config = ApiConfig<{ body: CreatePasswordVariables }>;
