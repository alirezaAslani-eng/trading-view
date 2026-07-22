import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { KycL2SchemaType } from "@/validations/types";
import { KycL2Response } from "@/api/types";
import { BaseApiResponse } from "@/types";
import mutationFetch from "@/utils/app/mutationFetch";

const URL = `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/kyc/advanced/documents/upload`;

async function kycL2(body: KycL2SchemaType): Promise<KycL2Response> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL, {
      method: "POST",
      body: getBody(body),
    });
    return res;
  })) as Response;

  const data = (await handleApiResponse(res)) as BaseApiResponse<KycL2Response>;

  return data.data;
}

export default kycL2;
// * Helpers
function getBody(body: KycL2SchemaType): FormData {
  const formData = new FormData();

  body.file.forEach((file) => {
    formData.append("file", file);
  });
  formData.append("type", "NationalCard");

  return formData;
}
