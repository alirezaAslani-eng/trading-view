// --- kycMergeAccount ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/kyc/merge-account");

export const kycMergeAccount = async ({
  signal,
  body,
}: Config): Promise<KycMergeAccountData> => {
  const res = await apiClient.post(url, {
    signal,
    body: JSON.stringify(body),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type KycMergeAccountData = void; // * the api doesn't return anything
export interface KycMergeAccountVariables {
  nationalId: string;
}
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ body: KycMergeAccountVariables }>;
//#endregion // * ------------ Internal types ------------
