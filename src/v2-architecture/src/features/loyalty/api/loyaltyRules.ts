// --- loyaltyRules ---
import { LoyaltyRuleSchema } from "../validations";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/admin/tiers/rules");

export const loyaltyRules = async ({
  signal,
}: ApiConfig = {}): Promise<LoyaltyRulesData> => {
  const res = await apiClient.get(url, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<LoyaltyRulesData>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type LoyaltyRulesData = LoyaltyRuleSchema[];
//#endregion // * ------------ Shared types ------------
