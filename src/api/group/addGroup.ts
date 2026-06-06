import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import { AddGroupSchemaType } from "@/validations/types";
import mutationFetch from "@/utils/app/mutationFetch";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/Permissions/groups`;

async function addgroup(body: AddGroupSchemaType): Promise<void> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      body: JSON.stringify(body satisfies AddGroupSchemaType),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  await handleApiResponse(res);
}

export default addgroup;
