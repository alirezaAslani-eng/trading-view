import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

export interface SwitchWorkSpaceVariables {
  companyId: string;
}

const URL = apiClient.authBaseURL("/api/v1/auth/switch-workspace");

export const switchWorkSpace = async ({
  signal,
  body,
}: Config): Promise<void> => {
  const res = await apiClient.post(URL, { signal, body: JSON.stringify(body) });
  return apiError.jsonHandler(res);
};

type Config = ApiConfig<{ body: SwitchWorkSpaceVariables }>;
