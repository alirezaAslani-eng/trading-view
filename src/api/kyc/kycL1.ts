import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responseErrorHandler";
import { KycL1RequestBody } from "@/api/types";
import { KycL1SchemaType } from "@/validations/types";
import { sharedRequestInit } from "../sharedRequestInit";
import mutationFetch from "@/utils/app/mutationFetch";
const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/kyc/level1`;

async function kycL1(body: KycL1SchemaType): Promise<void> {
  console.log(body);

  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      body: JSON.stringify({
        nationalId: body.nationalId,
        birthDateShamsi: `${body.birthYear}/0${body.birthMonth}/0${body.birthDay}`,
      } satisfies KycL1RequestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  await responseErrorHandler(res);
}

export default kycL1;
