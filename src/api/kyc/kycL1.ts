import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responsiveErrorHandler";
import clientEnv from "@/validations/env/clientEnv";
import { KycL1SchemaType } from "@/validations/types";

const URL = `${clientEnv?.NEXT_PUBLIC_BASEURL}/api/v1/kyc/level1`;

// TODO -> Response type must be defined by TS
async function kycL1(body: KycL1SchemaType): Promise<unknown> {


  const res = (await fetchHandler(async () => {
    const res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(body satisfies KycL1SchemaType),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;



  await responseErrorHandler(res);

  const data = await res.json();

  return data;
}

export default kycL1;
