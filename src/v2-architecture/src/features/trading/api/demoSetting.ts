import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

export interface DemoSettingData {
  initialIrtAmount: number;
  initialAssetAmount: number;
  validityDays: number;
}

const URL = apiClient.baseURL("/api/v1/admin/tiers/demo-settings");

export const demoSetting = async ({
  signal,
}: ApiConfig = {}): Promise<DemoSettingData> => {
  const res = await apiClient.get(URL, { signal });
  const raw = await apiError.jsonHandler<BaseApiResponse<DemoSettingData>>(res);
  return raw.data;
};
