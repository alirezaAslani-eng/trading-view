import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { kycL3SchemaOutput } from "../validations";
import { JALALI_FORMAT } from "@/constant/app/date";

export type KycL3Variables = kycL3SchemaOutput;

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
  formData.append(
    "birthDateShamsi" satisfies AppendKeys,
    body.birthDateShamsi.format(JALALI_FORMAT)
  );
  formData.append("video" satisfies AppendKeys, body.video);

  return formData;
}
