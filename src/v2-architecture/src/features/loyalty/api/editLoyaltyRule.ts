// --- editLoyaltyRule ---
import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { LoyaltyRuleSchema } from "../validations";

const url = apiClient.authBaseURL("/api/v1/admin/tiers/rules");

export const editLoyaltyRule = async ({
  signal,
  body,
}: Config): Promise<EditLoyaltyRuleData> => {
  const res = await apiClient.put(url, {
    signal,
    body: JSON.stringify(body),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type EditLoyaltyRuleData = void; // * the api doesn't return anything
export type EditLoyaltyRuleVariables = LoyaltyRuleSchema;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ body: EditLoyaltyRuleVariables }>;
//#endregion // * ------------ Internal types ------------
