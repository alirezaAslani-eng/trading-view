import { KycStepStatus } from "@/constant/features/kyc/entity";
import { KycLevel } from "@/types";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

type StepKey =
  | "Level1_Identity"
  | "Level2_Address"
  | "Level2_Document"
  | "Level3_Liveness";

interface KycStep<TStepKey extends StepKey> {
  stepKey: TStepKey;
  status: KycStepStatus;
  comment: string | null;
}

export interface KycProgressData {
  currentLevel: KycLevel;
  level1: {
    identity: KycStep<"Level1_Identity">;
  };
  level2: {
    address: KycStep<"Level2_Address">;
    document: KycStep<"Level2_Document">;
  };
  level3: {
    liveness: KycStep<"Level3_Liveness">;
  };
}

const URL = apiClient.authBaseURL("/api/v1/kyc/progress");

export const kycProgress = async ({
  signal,
}: ApiConfig = {}): Promise<KycProgressData> => {
  const res = await apiClient.get(URL, { signal });
  const raw = await apiError.jsonHandler<BaseApiResponse<KycProgressData>>(res);
  return raw.data;
};
