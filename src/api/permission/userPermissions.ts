import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { PermissionGroupsResponse, UserPermissionsResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { BaseApiResponse } from "@/types";

const URL = (userID: string) =>
  `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/permissions/user/${userID}`;

async function userPermissions(
  userID: string,
): Promise<UserPermissionsResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(userID), {
      ...sharedRequestInit,
    });
    return response;
  })) as Response;
  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<UserPermissionsResponse>;
  return data.data;
}

export default userPermissions;
