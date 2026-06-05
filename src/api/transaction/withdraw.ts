import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responseErrorHandler";
import { WithdrawSchemaType } from "@/validations/types";
import { sharedRequestInit } from "../sharedRequestInit";
import mutationFetch from "@/utils/app/mutationFetch";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/wallet/withdraw-request`;

async function withdraw(body: WithdrawSchemaType): Promise<void> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      body: JSON.stringify(body satisfies WithdrawSchemaType),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  await responseErrorHandler(res);
}

export default withdraw;
