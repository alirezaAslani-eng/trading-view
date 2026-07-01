import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import mutationFetch from "@/utils/app/mutationFetch";
import { sharedRequestInit } from "../sharedRequestInit";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/auth/logout`;

async function logout():Promise<void> {
  const res = (await fetchHandler(async () => {
    return mutationFetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      
    });
  })) as Response;

  await handleApiResponse(res) 
}

export default logout;