// --- loyaltyProgress ---

import { UserTier } from "@/v2-architecture/src/entity/user";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/user/loyalty");

export const loyaltyProgress = async ({
  signal,
}: ApiConfig = {}): Promise<LoyaltyProgressData> => {
  const res = await apiClient.get(url, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<LoyaltyProgressData>>(res);
  return transformData(raw.data);
};

function transformData(data: LoyaltyProgressData): LoyaltyProgressData {
  return {
    ...data,
    currentFeeRate: data.currentFeeRate * 100,
    nextTier: data.nextTier
      ? {
          ...data.nextTier,
          nextFeeRate: data.nextTier.nextFeeRate * 100,
        }
      : null,
  };
}

//#region // * ------------ Shared types ------------
export type LoyaltyProgressData = {
  currentTier: UserTier;
  currentFeeRate: number;
  volume30Days: number;
  nextTier: {
    name: UserTier;
    targetVolume: number;
    remainingVolume: number;
    nextFeeRate: number;
  } | null;
  chartData: {
    progressPercentage: number;
    min: number;
    max: number;
    current: number;
  };
};
//#endregion // * ------------ Shared types ------------
