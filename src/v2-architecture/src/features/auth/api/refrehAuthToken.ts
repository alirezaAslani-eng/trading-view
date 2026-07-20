import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const URL = apiClient.baseURL("/api/v1/auth/refresh");

interface RefreshAuthTokenData {
  message: string;
  token: string;
}

export async function refrehAuthToken({
  signal,
}: ApiConfig): Promise<RefreshAuthTokenData> {
  const res = await apiClient.post(URL, { signal });
  return apiError.jsonHandler<RefreshAuthTokenData>(res);
}
