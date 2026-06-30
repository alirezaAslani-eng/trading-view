import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import { PermissionChecklistResponse } from "../types";
import { BaseApiResponse } from "@/types";

const URL = (groupId: string | number) => {
  return `${process.env.NEXT_PUBLIC_BASEURL}/api/permissions/groups/${groupId}/checklist`;
};

async function permissionChecklist(
  groupId: string | number,
): Promise<PermissionChecklistResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL(groupId), {
      ...sharedRequestInit,
    });

    return response;
  })) as Response;

 const data =
  (await handleApiResponse(res)) as BaseApiResponse<PermissionChecklistResponse>;
return data.data;
}

export default permissionChecklist;
