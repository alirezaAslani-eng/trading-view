import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import { AddProductSchemaType } from "@/validations/types";
import mutationFetch from "@/utils/app/mutationFetch";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/products`;

async function addProduct(body: AddProductSchemaType): Promise<void> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL, {
      ...sharedRequestInit,
      method: "POST",
      body: JSON.stringify(body satisfies AddProductSchemaType),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  await handleApiResponse(res);
}

export default addProduct;
