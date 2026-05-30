import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responsiveErrorHandler";
import { KycL2SchemaType } from "@/validations/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { KycL2Response } from "@/api/types";
import jsonParseHandler from "@/utils/app/jsonParseHandler";
import { BaseApiResponse } from "@/types";
import { createApiUrl } from "@/utils";
const URL = createApiUrl("/api/v1/kyc/address");

async function kycL2(body: KycL2SchemaType): Promise<KycL2Response> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      body: JSON.stringify(body satisfies KycL2SchemaType),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  await responseErrorHandler(res);

  const data = (await jsonParseHandler(res)) as BaseApiResponse<KycL2Response>;

  return data.data;
}

export default kycL2;
