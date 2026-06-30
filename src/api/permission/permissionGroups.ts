import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { PermissionGroupsResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/Permissions/groups`;

async function PermissionGroups(): Promise<PermissionGroupsResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL, {
      ...sharedRequestInit,
    });
    return response;
  })) as Response;
  const data = (await handleApiResponse(res)) as PermissionGroupsResponse;
  return data;
}

export default PermissionGroups;
