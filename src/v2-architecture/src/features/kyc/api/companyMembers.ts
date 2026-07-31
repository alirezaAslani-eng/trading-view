// --- companyMembers ---

import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const fakeCompanyMembers: CompanyMembersData = [
  {
    id: "m1",
    name: "علی رضایی",
    phoneNumber: "09121234567",
    nationalCode: "0012345678",
  },
  {
    id: "m2",
    name: "سارا محمدی",
    phoneNumber: "09359876543",
    nationalCode: "0023456789",
  },
  {
    id: "m3",
    name: "امیر حسینی",
    phoneNumber: "09131112233",
    nationalCode: "0034567890",
  },
];

const url = (params: CompanyMembersParams) =>
  apiClient.authBaseURL(`/api/v1/workspaces/${params.id}/members`);

export const companyMembers = async ({
  signal,
  params,
}: Config): Promise<CompanyMembersData> => {
  // TEMP: fake response until the server confirms the real data shape
  return fakeCompanyMembers;

  // const res = await apiClient.get(url(params), { signal });
  // const raw =
  //   await apiError.jsonHandler<BaseApiResponse<CompanyMembersData>>(res);
  // return raw.data;
};

//#region // * ------------ Shared types ------------
export type CompanyMembersData = {
  id: string;
  name: string;
  phoneNumber: string;
  nationalCode: string;
}[];
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
interface CompanyMembersParams {
  id: string;
}
type Config = ApiConfig<{ params: CompanyMembersParams }>;
//#endregion // * ------------ Internal types ------------