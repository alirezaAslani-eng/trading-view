import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { KycL1Schema } from "../validations";

const URL = apiClient.authBaseURL("/api/v1/kyc/level1");

export const kycL1 = async ({ signal, body }: Config): Promise<void> => {
  const res = await apiClient.post(URL, {
    signal,
    body: JSON.stringify(getBody(body)),
  });
  await apiError.jsonHandler<void>(res);
};

//#region // * ------------ Types -----------
export interface KycL1Variables extends KycL1Schema {}
type Config = ApiConfig<{ body: KycL1Variables }>;
//#endregion // * ------------ Types ------------

//#region // * ------------ Helpers ------------
function getBody(body: KycL1Variables) {
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
//#endregion // * ------------ Helpers ------------
