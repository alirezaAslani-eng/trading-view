// --- kycL2 ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { KycL2SchemaType } from "@/validations/types";

const url = apiClient.authBaseURL("/api/v1/kyc/level2-info");

export const kycL2 = async ({ signal, body }: Config): Promise<KycL2Data> => {
  const res = await apiClient.post(url, {
    signal,
    body: getBody(body),
  });
  return apiError.jsonHandler(res);
};

// * Helpers
function getBody(body: KycL2Variables): FormData {
  const { file, ...kyc_info } = body;
  const formData = new FormData();
  file.forEach((file) => {
    formData.append("file", file);
  });
  Object.keys(kyc_info).map((field) => {
    formData.append(field, kyc_info[field as keyof typeof kyc_info]);
  });
  return formData;
}

//#region // * ------------ Shared types ------------
export type KycL2Data = void;
export type KycL2Variables = KycL2SchemaType;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ body: KycL2Variables }>;
//#endregion // * ------------ Internal types ------------
