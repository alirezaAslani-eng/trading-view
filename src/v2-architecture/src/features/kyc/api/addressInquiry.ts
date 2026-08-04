// --- addressInquiry ---
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
} from "@/v2-architecture/src/api";

const url = (params: AddressInquiryParams) =>
  apiClient.authBaseURL(`/api/v1/kyc/address-inquiry/${params.postalCode}`);

export const addressInquiry = async ({
  signal,
  params,
}: Config): Promise<AddressInquiryData> => {
  const res = await apiClient.get(url(params), { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<AddressInquiryData>>(res);
  return raw.data;
};

//#region // * ------------ Shared types ------------
export type AddressInquiryData = {
  postalCode: string;
  state: string;
  city: string;
  fullAddress: string;
};
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
interface AddressInquiryParams {
  postalCode: string;
}
type Config = ApiConfig<{ params: AddressInquiryParams }>;
//#endregion // * ------------ Internal types ------------
