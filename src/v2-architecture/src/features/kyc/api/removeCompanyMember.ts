// --- removeCompanyMember ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const url = (params: RemoveCompanyMemberParams) =>
  apiClient.authBaseURL(`/api/v1/workspaces/${params.id}/members`);

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
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
interface RemoveCompanyMemberParams {
  id: string;
}
type Config = ApiConfig<{ params: RemoveCompanyMemberParams }>;
//#endregion // * ------------ Internal types ------------
