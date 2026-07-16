import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import mutationFetch from "@/utils/app/mutationFetch";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/wallet/demo/activate`;
async function enableDemo(): Promise<void> {
  const res = (await fetchHandler(() => {
    return mutationFetch(URL, {
      method: "PUT",
      ...sharedRequestInit,
    });
  })) as Response;

  await handleApiResponse(res);
}

export default enableDemo;
