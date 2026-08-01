// --- kycL1 ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { KycL1Schema } from "@/validations/kyc/kycL1Schema";

const url = apiClient.authBaseURL("/api/v1/kyc/level1");

export const kycL1 = async ({ signal, body }: Config): Promise<KycL1Data> => {
  const res = await apiClient.post(url, {
    signal,
    body: JSON.stringify(transformBody(body)),
  });
  return apiError.jsonHandler(res);
};

function transformBody(body: KycL1Variables) {
  return {
    nationalId: body.nationalId,
    birthDateShamsi: formatShamsiDate(
      body.birthYear,
      body.birthMonth,
      body.birthDay,
    ),
  };
}

function formatShamsiDate(
  year: number | string,
  month: number | string,
  day: number | string,
): string {
  function pad2(value: number | string): string {
    return String(value).padStart(2, "0");
  }
  return `${year}/${pad2(month)}/${pad2(day)}`;
}

//#region // * ------------ Shared types ------------
export type KycL1Data = void; // * the api doesn't return anything
export type KycL1Variables = KycL1Schema;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ body: KycL1Variables }>;
//#endregion // * ------------ Internal types ------------