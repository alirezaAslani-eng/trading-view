import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responsiveErrorHandler";
import clientEnv from "@/validations/env/clientEnv";
import { KycStatusResponse } from "@/api/types";
import jsonParseHandler from "@/utils/app/jsonParseHandler";
import { BaseApiResponse } from "@/types";

const URL = `${clientEnv?.NEXT_PUBLIC_BASEURL}/api/v1/kyc/status`;

async function kycStatus(): Promise<KycStatusResponse> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL);
    return res;
  })) as Response;

  await responseErrorHandler(res);

  const data = (await jsonParseHandler(
    res,
  )) as BaseApiResponse<KycStatusResponse>;

  return data.data;
}

export default kycStatus;
