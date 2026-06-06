import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import mutationFetch from "@/utils/app/mutationFetch";

const getURL = (id: number) =>
  `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/kyc/bank-account/${id}`;

async function deleteBankAccount(id: number): Promise<void> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(getURL(id), {
      ...sharedRequestInit,
      method: "DELETE",
    });
    return res;
  })) as Response;

  await handleApiResponse(res);
}

export default deleteBankAccount;
