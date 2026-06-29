import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { ProductCategoriesResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { BaseApiResponse } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/products/categories`;

async function productCategories(): Promise<ProductCategoriesResponse> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL, sharedRequestInit);
    return res;
  })) as Response;

  const data = (await handleApiResponse(res)) as BaseApiResponse<ProductCategoriesResponse>;

  return data.data;
}

export default productCategories;
