import { apiError, apiClient, ApiConfig } from "@/v2-architecture/src/api";

// feat/auth/api
export async function logout({ signal }: ApiConfig): Promise<void> {
  const res = await apiClient.post(
    apiClient.authBaseURL("/api/v1/auth/logout"),
    { signal },
  );

  await apiError.jsonHandler<void>(res);
}
