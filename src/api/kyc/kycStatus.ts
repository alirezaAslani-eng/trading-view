import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responseErrorHandler";
import { KycStatusResponse } from "@/api/types";
import jsonParseHandler from "@/utils/app/jsonParseHandler";
import { BaseApiResponse } from "@/types";
import { createApiUrl } from "@/utils";
import api from "../api";

const URL = createApiUrl("/api/v1/kyc/status");

async function kycStatus(options?: RequestInit): Promise<KycStatusResponse> {
  const res = (await fetchHandler(async () => {
    const res = await api(URL, options);
    return res;
  })) as Response;

  await responseErrorHandler(res);

  const data = (await jsonParseHandler(
    res,
  )) as BaseApiResponse<KycStatusResponse>;

  return data.data;
}

export default kycStatus;
