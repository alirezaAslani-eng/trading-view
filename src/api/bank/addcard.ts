import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { AddCardSchemaType } from "@/validations/types";
import { sharedRequestInit } from "../sharedRequestInit";
import mutationFetch from "@/utils/app/mutationFetch";
import { BaseApiResponse, KycLevel } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/kyc/bank-account`;

async function addCard(
  body: AddCardSchemaType,
): Promise<BaseApiResponse<KycLevel>> {
  console.log(body);

  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      body: JSON.stringify({
        birthDateShamsi: body.birthDateShamsi,
        cardNumber: body.cardNumber,
      } satisfies AddCardSchemaType),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  const data = (await handleApiResponse(res)) as BaseApiResponse<KycLevel>;

  return data;
}

export default addCard;
