import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { GetProductsQueries, ProductsResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { LegacyApiOptions, BaseApiResponse } from "@/types";

const getUrlQueries = (queries?: GetProductsQueries) => {
  const searchParams = new URLSearchParams({ ...queries });
  if (queries?.isActive === "null") searchParams.delete("isActive");
  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/products?${searchParams.toString()}`;
};

async function getProducts({
  queries,
}: LegacyApiOptions<{}, GetProductsQueries>): Promise<ProductsResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(getUrlQueries(queries), {
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
