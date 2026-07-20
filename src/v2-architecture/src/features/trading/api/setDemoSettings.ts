import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

export interface SetDemoSettingVariables {
  initialIrtAmount: number;
  initialAssetAmount: number;
  validityDays: number;
}

type Config = ApiConfig<{ body: SetDemoSettingVariables }>;

const URL = apiClient.authBaseURL("/api/v1/admin/tiers/demo-settings");

export const setDemoSetting = async ({
  body,
  signal,
}: Config): Promise<void> => {
  const res = await apiClient.put(URL, {
    body: JSON.stringify(body),
    signal,
  });

  return await apiError.jsonHandler<void>(res);
};
