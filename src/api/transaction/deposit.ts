// --- deposit ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { TradeModeVariables } from "@/v2-architecture/src/features/trading/api";

const url = apiClient.authBaseURL("/api/v1/wallet/deposit");

export const deposit = async ({
  signal,
  body,
}: Config): Promise<DepositData> => {
  const res = await apiClient.post(url, {
    signal,
    body: JSON.stringify(body),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type DepositData = void; // * the api doesn't return anything
export type DepositVariables = {
  amount: number;
  referenceId: string;
} & TradeModeVariables;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ body: DepositVariables }>;
//#endregion // * ------------ Internal types ------------
