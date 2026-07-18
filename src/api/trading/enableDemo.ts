import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import mutationFetch from "@/utils/app/mutationFetch";
import { BaseApiResponse } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/wallet/demo/activate`;

type EnableDemoResponse = { expirationDate: string };
async function enableDemo(): Promise<EnableDemoResponse> {
  const res = (await fetchHandler(() => {
    return mutationFetch(URL, {
      method: "POST",
      ...sharedRequestInit,
    });
  })) as Response;

  const data = (await handleApiResponse(res)) as BaseApiResponse<EnableDemoResponse>;

  return {
    expirationDate: data.data.expirationDate,
  };
}

export default enableDemo;
