import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responseErrorHandler";
import { KycL2SchemaType } from "@/validations/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { KycL2Response } from "@/api/types";
import jsonParseHandler from "@/utils/app/jsonParseHandler";
import { BaseApiResponse } from "@/types";
import mutationFetch from "@/utils/app/mutationFetch";
const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/kyc/address`;

async function kycL2(body: KycL2SchemaType): Promise<KycL2Response> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL, {
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
