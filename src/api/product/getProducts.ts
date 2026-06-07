import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { GetProductsParams, ProductsResponse } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import { ApiOptions, BaseApiResponse } from "@/types";

const getUrl = (params?: GetProductsParams) => {
  const statusKey: Record<GetProductsParams["productStatus"], string> = {
    active: "true",
    inActive: "false",
    all: "",
  };
  const produstStatus = statusKey[params?.productStatus ?? "all"];
  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/products/${produstStatus}`;
};

async function getProducts({
  params,
}: ApiOptions<GetProductsParams>): Promise<ProductsResponse> {
  const res = (await fetchHandler(async () => {
    const response = await fetch(getUrl(params), {
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
