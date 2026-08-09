// --- marginTransferIn ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";
import { MarginTransferInSchema } from "../validations";

const url = apiClient.authBaseURL("/api/v1/wallet/margin/transfer-in");

export const marginTransferIn = async ({
  signal,
  body,
}: Config): Promise<MarginTransferInData> => {
  const res = await apiClient.post(url, {
    signal,
    body: JSON.stringify(body),
  });
  return apiError.jsonHandler(res);
};

//#region // * ------------ Shared types ------------
export type MarginTransferInData = void; // * the api doesn't return anything
export type MarginTransferInVariables = MarginTransferInSchema;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ body: MarginTransferInVariables }>;
//#endregion // * ------------ Internal types ------------
