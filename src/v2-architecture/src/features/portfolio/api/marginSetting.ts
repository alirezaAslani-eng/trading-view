// --- marginSettings ---

import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/admin/tiers/margin-settings");

export const marginSettings = async ({
  signal,
}: ApiConfig = {}): Promise<MarginSettingsData> => {
  const res = await apiClient.get(url, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<MarginSettingsData>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type MarginSettingsData = {
  isActive: boolean;
  leverageRatio: number;
  dailyInterestRate: number;
  liquidationThreshold: number;
  marginCallThreshold: number;
};
//#endregion // * ------------ Shared types ------------
