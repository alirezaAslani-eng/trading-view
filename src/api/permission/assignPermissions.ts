import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import { AssignPermissionRequest } from "../types";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/permissions/groups/assign`;

async function assignPermissions(body: AssignPermissionRequest) {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL, {
      method: "POST",
      ...sharedRequestInit,
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  })) as Response;
  await handleApiResponse(res);
}
export default assignPermissions;
