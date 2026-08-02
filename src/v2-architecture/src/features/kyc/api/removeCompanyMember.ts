// --- removeCompanyMember ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const url = (params: RemoveCompanyMemberParams) =>
  apiClient.authBaseURL(
    `/api/v1/workspaces/${params.companyId}/members/${params.employeeId}`,
  );

export const removeCompanyMember = async ({
  signal,
  params,
}: Config): Promise<RemoveCompanyMemberData> => {
  const res = await apiClient.delete(url(params), {
    signal,
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type RemoveCompanyMemberData = void; // * the api doesn't return anything
export interface RemoveCompanyMemberParams {
  employeeId: string;
  companyId: string;
}
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ params: RemoveCompanyMemberParams }>;
//#endregion // * ------------ Internal types ------------
