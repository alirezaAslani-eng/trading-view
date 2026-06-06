import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { KycStatusResponse } from "@/api/types";
import { BaseApiResponse } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/kyc/status`;

async function kycStatus(options?: RequestInit): Promise<KycStatusResponse> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL, options);
    return res;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<KycStatusResponse>;

  return data.data;
}

export default kycStatus;
