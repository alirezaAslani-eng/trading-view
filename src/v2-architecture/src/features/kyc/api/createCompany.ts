import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { CreateCompanySchema } from "../validations";

export interface CreateCompanyVariables extends CreateCompanySchema {}

const URL = apiClient.authBaseURL("/api/v1/kyc/level1/company");

export const createCompany = async ({
  signal,
  body,
}: Config): Promise<void> => {
  const res = await apiClient.post(URL, { signal, body: JSON.stringify(body) });
  return apiError.jsonHandler(res);
};

type Config = ApiConfig<{ body: CreateCompanyVariables }>;
