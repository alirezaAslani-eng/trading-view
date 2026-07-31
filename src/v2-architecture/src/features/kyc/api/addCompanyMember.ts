import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const url = (body: AddCompanyMemberVariables) =>
  apiClient.authBaseURL(`/api/v1/workspaces/${body.companyId}/members`);

export const addCompanyMember = async ({
  signal,
  body,
}: Config): Promise<AddCompanyMemberData> => {
  const res = await apiClient.post(url(body), {
    signal,
    body: JSON.stringify(body),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type AddCompanyMemberData = void; // * the api doesn't return anything
export interface AddCompanyMemberVariables {
  companyId: string;
}
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{
  body: AddCompanyMemberVariables;
}>;
//#endregion // * ------------ Internal types ------------
