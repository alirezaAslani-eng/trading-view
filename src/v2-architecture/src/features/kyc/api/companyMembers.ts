// --- companyMembers ---

import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";
import {
  MY_COMPANY_ROLE,
  MyCompanyRole,
} from "@/v2-architecture/src/features/kyc/api";

const url = (params: CompanyMembersParams) =>
  apiClient.authBaseURL(`/api/v1/workspaces/${params.id}/members`);

export const companyMembers = async ({
  signal,
  params,
}: Config): Promise<CompanyMembersData> => {
  // const res = await apiClient.get(url(params), { signal });
  // const raw =
  //   await apiError.jsonHandler<BaseApiResponse<CompanyMembersData>>(res);
  // return raw.data;
  return [
    {
      employeeId: "1",
      fullName: "علی رضایی",
      phoneNumber: "09121234567",
      role: MY_COMPANY_ROLE.owner,
      joinedAt: "2025-01-15T08:30:00.000Z",
    },
    {
      employeeId: "2",
      fullName: "سارا محمدی",
      phoneNumber: "09359876543",
      role: MY_COMPANY_ROLE.trader,
      joinedAt: "2025-03-22T11:00:00.000Z",
    },
    {
      employeeId: "3",
      fullName: "امیر حسینی",
      phoneNumber: "09131112233",
      role: MY_COMPANY_ROLE.trader,
      joinedAt: "2025-05-09T14:45:00.000Z",
    },
  ];
};

//#region // * ------------ Shared types ------------
export type CompanyMembersData = {
  employeeId: string;
  fullName: string;
  phoneNumber: string;
  role: MyCompanyRole;
  joinedAt: string;
}[];
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
interface CompanyMembersParams {
  id: string;
}
type Config = ApiConfig<{ params: CompanyMembersParams }>;
//#endregion // * ------------ Internal types ------------
