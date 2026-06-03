import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responseErrorHandler";
import { AddShabaSchemaType } from "@/validations/types";
import { sharedRequestInit } from "../sharedRequestInit";
import mutationFetch from "@/utils/app/mutationFetch";
import jsonParseHandler from "@/utils/app/jsonParseHandler";
import { BaseApiResponse, KycLevel } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/kyc/bank-account`;

async function addShaba(body: AddShabaSchemaType): Promise<BaseApiResponse<KycLevel>> {
  console.log(body);

  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      body: JSON.stringify({
        birthDateShamsi: body.birthDateShamsi,
        Iban: `IR${body.Iban}`
      } satisfies AddShabaSchemaType),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  await responseErrorHandler(res);

  const data = (await jsonParseHandler(res)) as BaseApiResponse<KycLevel>;

  return data;
}

export default addShaba;
