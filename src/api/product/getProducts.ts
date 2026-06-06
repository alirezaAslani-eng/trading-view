import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { ProductsResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { BaseApiResponse } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/products`;

async function getProducts(): Promise<ProductsResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(URL, {
      ...sharedRequestInit,
      method: "GET",
    });
    return response;
  })) as Response;

  const data = (await handleApiResponse(
    res,
  )) as BaseApiResponse<ProductsResponse>;

  return data.data;
}

export default getProducts;
