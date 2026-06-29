import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { sharedRequestInit } from "../sharedRequestInit";
import mutationFetch from "@/utils/app/mutationFetch";

const URL = (id: string) =>
  `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/products/${id}`;

async function deleteProduct(id: string): Promise<void> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL(id), {
      ...sharedRequestInit,
      method: "DELETE",
    });
    return res;
  })) as Response;

  await handleApiResponse(res);
}

export default deleteProduct;
