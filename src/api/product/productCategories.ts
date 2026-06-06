import fetchHandler from "@/utils/app/fetchHandler";
import responseErrorHandler from "@/utils/app/responseErrorHandler";
import { ProductCategoriesResponse } from "@/api/types";
import jsonParseHandler from "@/utils/app/jsonParseHandler";
import { BaseApiResponse } from "@/types";
import { sharedRequestInit } from "../sharedRequestInit";

const URL = `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/products/categories`;

async function productCategories(): Promise<ProductCategoriesResponse> {
  const res = (await fetchHandler(async () => {
    const res = await fetch(URL, sharedRequestInit);
    return res;
  })) as Response;

  await responseErrorHandler(res);

  const data = (await jsonParseHandler(
    res,
  )) as BaseApiResponse<ProductCategoriesResponse>;

  return data.data;
}

export default productCategories;
