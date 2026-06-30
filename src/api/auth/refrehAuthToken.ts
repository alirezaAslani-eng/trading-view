import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import mutationFetch from "@/utils/app/mutationFetch";
import { sharedRequestInit } from "../sharedRequestInit";
import { RefreshAuthTokenResponse } from "../types";

const URL = `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/auth/refresh`;

async function refrehAuthToken(
  options: RequestInit,
): Promise<RefreshAuthTokenResponse> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      ...options,
    });
    return res;
  })) as Response;

  return handleApiResponse(res) as Promise<RefreshAuthTokenResponse>;
}

export default refrehAuthToken;
