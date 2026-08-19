import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

export interface SettleTradeContractParams {
  id: string;
}

type Config = ApiConfig<{ params: SettleTradeContractParams }>;

const url = (params: SettleTradeContractParams) => {
  return apiClient.authBaseURL(
    `/api/v1/wallet/credit/contracts/${params.id}/settle`,
  );
};

export const settleTradeContract = async ({
  signal,
  params,
}: Config): Promise<void> => {
  const res = await apiClient.post(url(params), { signal });
  return apiError.jsonHandler(res);
};
