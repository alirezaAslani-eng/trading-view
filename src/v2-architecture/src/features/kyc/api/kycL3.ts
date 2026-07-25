import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { KycL3SchemaOutput } from "../validations";

export type KycL3Variables = KycL3SchemaOutput;

type Config = ApiConfig<{ body: KycL3Variables }>;

const URL = apiClient.authBaseURL("/api/v1/kyc/advanced/liveness/start");

export const kycL3 = async ({ signal, body }: Config): Promise<void> => {
  const res = await apiClient.post(URL, {
    signal,
    body: getBody(body),
  });
  await apiError.jsonHandler<void>(res);
};

// * Api Helpers
function getBody(body: KycL3Variables): FormData {
  const formData = new FormData();
  type AppendKeys = keyof KycL3Variables;
  formData.append("video" satisfies AppendKeys, body.video);

  return formData;
}
