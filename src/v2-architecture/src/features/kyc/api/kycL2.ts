import { KycL2Schema } from "../validations";
import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const URL = apiClient.authBaseURL("/api/v1/kyc/address");

export const kycL2 = async ({ signal, body }: Config): Promise<void> => {
  const res = await apiClient.post(URL, {
    signal,
    body: JSON.stringify(body),
  });
  await apiError.jsonHandler<void>(res);
};

//#region // * ------------ Types ------------
export interface KycL2Variables extends KycL2Schema {}
type Config = ApiConfig<{ body: KycL2Variables }>;
//#endregion // * ------------ Types ------------
