import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responseErrorHandler";
import { DashboardInfoResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { createApiUrl } from "@/utils";
import jsonParseHandler from "@/utils/app/jsonParseHandler";
import { BaseApiResponse } from "@/types";
import api from "../api";

const URL = createApiUrl("/api/v1/user/dashboard");

async function dashboardInfo(
  options?: RequestInit,
): Promise<DashboardInfoResponse> {
  const res = (await fetchHandler(async () => {
    const res = await api(URL, {
      ...options,
      ...sharedRequestInit,
      method: "GET",
    });
    return res;
  })) as Response;

  await responseErrorHandler(res);

  const data = (await jsonParseHandler(
    res,
  )) as BaseApiResponse<DashboardInfoResponse>;

  return data.data;
}

export default dashboardInfo;
