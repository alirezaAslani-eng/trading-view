import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

export const MY_COMPANY_ROLE = {
  owner: "Owner",
  trader: "Trader",
} as const;
export type MyCompanyRole =
  (typeof MY_COMPANY_ROLE)[keyof typeof MY_COMPANY_ROLE];

export type ResponseData = {
  companyId: string;
  companyName: string;
  companyNationalId: string;
  myRole: MyCompanyRole;
};

const URL = apiClient.authBaseURL("/api/v1/workspaces");

export const workspaces = async ({
  signal,
}: ApiConfig = {}): Promise<ResponseData> => {
  const res = await apiClient.get(URL, { signal });
  const raw = await apiError.jsonHandler<BaseApiResponse<ResponseData>>(res);
  return raw.data;
};
