import { KycLevel } from "@/v2-architecture/src/entity/kyc";
import {
  apiClient,
  apiError,
  type ApiConfig,
  type BaseApiResponse,
} from "@/v2-architecture/src/api";

const URL = apiClient.authBaseURL("/api/v1/kyc/status");

export const kycStatus = async ({
  signal,
}: ApiConfig = {}): Promise<ResponseData> => {
  const res = await apiClient.get(URL, { signal });
  const raw = await apiError.jsonHandler<BaseApiResponse<ResponseData>>(res);
  return raw.data;
};

//#region // * ------------ Types ------------
export interface ResponseData {
  fullName: string;
  phoneNumber: string;
  kycLevel: KycLevel;
  isActive: boolean;
}
//#endregion // * ------------ Types ------------
