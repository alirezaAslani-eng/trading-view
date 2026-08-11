import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

export interface SwitchWorkSpaceVariables {
  companyId: string;
}
export type SwitchWorkSpaceData = void;

const URL = apiClient.authBaseURL("/api/v1/auth/switch-workspace");

export const switchWorkSpace = async ({
  signal,
  body,
}: Config): Promise<SwitchWorkSpaceData> => {
  const res = await apiClient.post(URL, { signal, body: JSON.stringify(body) });
  return apiError.jsonHandler(res);
};

type Config = ApiConfig<{ body: SwitchWorkSpaceVariables }>;
