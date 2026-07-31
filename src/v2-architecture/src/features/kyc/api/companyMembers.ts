// --- companyMembers ---

import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const url = (params: CompanyMembersParams) =>
  apiClient.authBaseURL(`/api/v1/workspaces/${params.id}/members`);

export const companyMembers = async ({
  signal,
  params,
}: Config): Promise<CompanyMembersData> => {
  const res = await apiClient.get(url(params), { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<CompanyMembersData>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type CompanyMembersData = unknown[];
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
interface CompanyMembersParams {
  id: string;
}
type Config = ApiConfig<{ params: CompanyMembersParams }>;
//#endregion // * ------------ Internal types ------------
